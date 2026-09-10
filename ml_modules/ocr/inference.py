"""Runtime inference adapter for PaddleOCR Engine."""
import logging
from pathlib import Path
from typing import Union, Dict, Any

MODULE_DIR = Path(__file__).resolve().parent
_ocr_engine = None
_ocr_attempted = False

def _load_paddle_ocr():
    global _ocr_engine, _ocr_attempted
    if _ocr_attempted:
        return _ocr_engine
    _ocr_attempted = True
    try:
        from paddleocr import PaddleOCR
        # Initialize PaddleOCR with English language model and angle classification
        _ocr_engine = PaddleOCR(use_angle_cls=True, lang='en', show_log=False)
        logging.info("PaddleOCR engine initialized successfully.")
    except Exception as exc:
        logging.warning(f"PaddleOCR fallback mode active: {exc}")
        _ocr_engine = None
    return _ocr_engine

def analyze_image(image_input: Union[str, Path, bytes]) -> Dict[str, Any]:
    """
    Extracts handwritten and printed text from field safety slips/cards using PaddleOCR.
    Returns dictionary with extracted text, engine name, and status.
    """
    ocr = _load_paddle_ocr()
    if ocr is None:
        return {
            "module": "PaddleOCR Engine",
            "extracted_text": "",
            "success": False,
            "engine": "PaddleOCR (Fallback/Offline)"
        }

    try:
        results = ocr.ocr(image_input, cls=True)
        extracted_lines = []
        if results:
            for block in results:
                if block:
                    for line in block:
                        if line and len(line) > 1 and line[1]:
                            text_str = line[1][0]
                            if text_str and text_str.strip():
                                extracted_lines.append(text_str.strip())
        full_text = " ".join(extracted_lines)
        return {
            "module": "PaddleOCR Engine",
            "extracted_text": full_text,
            "success": True if full_text else False,
            "engine": "PaddleOCR v4"
        }
    except Exception as exc:
        logging.error(f"PaddleOCR extraction error: {exc}")
        return {
            "module": "PaddleOCR Engine",
            "extracted_text": "",
            "success": False,
            "error": str(exc),
            "engine": "PaddleOCR v4"
        }
