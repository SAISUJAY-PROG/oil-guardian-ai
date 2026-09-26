from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ml_modules.near_miss.inference import (
    analyze as analyze_near_miss
)

from ml_modules.unsafe_act.inference import (
    analyze as analyze_unsafe_act
)

from ml_modules.unsafe_condition.inference import (
    analyze as analyze_unsafe_condition
)

from ensemble.soft_voting import soft_vote


app = FastAPI(
    title="OIL Guardian AI API",
    description="Industrial safety monitoring and AI risk analysis API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyzeRequest(BaseModel):
    text: str


@app.get("/")
def root():
    return {
        "message": "OIL Guardian AI API is running",
        "status": "online"
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "service": "OIL Guardian AI"
    }


@app.post("/api/analyze")
def analyze_report(request: AnalyzeRequest):

    text = request.text.strip()

    if not text:
        return {
            "error": "Safety observation text is required."
        }

    near_miss = analyze_near_miss(text)

    unsafe_act = analyze_unsafe_act(text)

    unsafe_condition = analyze_unsafe_condition(text)

    ensemble = soft_vote(
        near_miss["confidence"] / 100,
        unsafe_act["confidence"] / 100,
        unsafe_condition["confidence"] / 100
    )

    return {
        "text": text,

        "models": {
            "near_miss": near_miss,
            "unsafe_act": unsafe_act,
            "unsafe_condition": unsafe_condition
        },

        "ensemble": ensemble
    }