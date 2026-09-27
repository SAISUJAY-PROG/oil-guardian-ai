import os
import tempfile
import json

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="OIL Guardian AI - OCR API",
    description="Lightweight PaddleOCR service for safety observation images",
    version="1.2.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ocr = None


def get_ocr():
    global ocr

    if ocr is None:
        print("Loading PaddleOCR...")

        from paddleocr import PaddleOCR

        ocr = PaddleOCR(
            text_detection_model_name="PP-OCRv5_mobile_det",
            text_recognition_model_name="PP-OCRv5_mobile_rec",
            use_doc_orientation_classify=False,
            use_doc_unwarping=False,
            use_textline_orientation=False,
            device="cpu",
            enable_mkldnn=False
        )

        print("PaddleOCR loaded successfully.")

    return ocr


@app.get("/")
def root():
    return {
        "message": "OIL Guardian AI OCR API is running",
        "status": "online"
    }


@app.get("/api/ocr/health")
def health():
    return {
        "status": "healthy",
        "service": "PaddleOCR",
        "ocr_loaded": ocr is not None
    }


@app.post("/api/ocr")
async def extract_text(file: UploadFile = File(...)):

    allowed_types = {
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/bmp"
    }

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Please upload a JPG, PNG, WEBP, or BMP image."
        )

    contents = await file.read()

    if not contents:
        raise HTTPException(
            status_code=400,
            detail="Uploaded image is empty."
        )

    suffix = os.path.splitext(file.filename or "")[1] or ".jpg"
    temp_path = None

    try:
        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=suffix
        ) as temp_file:
            temp_file.write(contents)
            temp_path = temp_file.name

        ocr_engine = get_ocr()

        results = ocr_engine.predict(temp_path)

        extracted_lines = []
        confidence_scores = []

        for result in results:

            if not hasattr(result, "json"):
                continue

            data = result.json

            if isinstance(data, str):
                try:
                    data = json.loads(data)
                except json.JSONDecodeError:
                    continue

            result_data = data.get("res", data)

            texts = result_data.get("rec_texts", [])
            scores = result_data.get("rec_scores", [])

            for text in texts:
                cleaned = str(text).strip()

                if cleaned:
                    extracted_lines.append(cleaned)

            for score in scores:
                try:
                    confidence_scores.append(float(score))
                except (TypeError, ValueError):
                    pass

        extracted_text = "\n".join(extracted_lines)

        average_confidence = (
            sum(confidence_scores) / len(confidence_scores)
            if confidence_scores
            else 0
        )

        return {
            "success": True,
            "filename": file.filename,
            "text": extracted_text,
            "lines": extracted_lines,
            "confidence": round(
                average_confidence * 100,
                2
            ),
            "line_count": len(extracted_lines)
        }

    except Exception as error:
        print("OCR error:", error)

        raise HTTPException(
            status_code=500,
            detail=f"OCR processing failed: {str(error)}"
        )

    finally:

        if temp_path and os.path.exists(temp_path):
            try:
                os.remove(temp_path)
            except OSError:
                pass