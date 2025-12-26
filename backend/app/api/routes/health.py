"""
Health check endpoints
"""
from fastapi import APIRouter
from app.models.schemas import HealthResponse
from app.core.config import settings

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint
    
    Returns:
        Health status of the AP
    """
    return HealthResponse(
        status="healthy",
        version="0.1.0",
        claude_model=settings.GEMINI_MODEL  # Still using claude_model field name for now
    )