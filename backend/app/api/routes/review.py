"""
Code review endpoints
"""
from fastapi import APIRouter, HTTPException, status
from app.models.schemas import ReviewResponse, ReviewRequest, ErrorResponse
from app.core.gemini_client import gemini_client
from app.core.config import settings
from app.utils.logger import get_logger

logger = get_logger(__name__)
router = APIRouter()


@router.post("/analyze", response_model=ReviewResponse)
async def analyze_code(request: ReviewRequest):
    """
    Analyze code and return review
    
    Args:
        request: ReviewRequest with code, filename, and review_type
        
    Returns:
        ReviewResponse with issues, summary, and metadata
        
    Raises:
        HTTPException: If code is too long or API fails
    """
    try:
        logger.info(f"Received review request for {request.filename} ({request.review_type})")
        
        # Validate code length
        line_count = len(request.code.split('\n'))
        if line_count > settings.MAX_FILE_LINES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File too large: {line_count} lines (max {settings.MAX_FILE_LINES})"
            )
        
        # Validate code is not empty
        if not request.code.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Code cannot be empty"
            )
        
        # Validate review type
        valid_types = ["general", "security", "performance", "style"]
        if request.review_type not in valid_types:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid review_type. Must be one of: {', '.join(valid_types)}"
            )
        
        # Call Gemini to review code
        logger.info("Sending code to Gemini for review...")
        result = await gemini_client.review_code(
            code=request.code,
            filename=request.filename,
            review_type=request.review_type
        )
        
        logger.info(f"Review completed successfully with {len(result.get('issues', []))} issues")
        
        return result
        
    except HTTPException:
        # Re-raise HTTP exceptions (our validation errors)
        raise
        
    except Exception as e:
        # Catch any other errors (API failures, etc.)
        error_message = str(e).lower()
        logger.error(f"Error during code review: {str(e)}")
        
        # Check for rate limit errors
        if 'quota' in error_message or 'rate limit' in error_message or 'resource exhausted' in error_message:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Gemini API rate limit reached. Please try again in a few minutes."
            )
        
        # Check for API key errors
        if 'api key' in error_message or 'authentication' in error_message or 'unauthorized' in error_message:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Gemini API key. Please check your configuration."
            )
        
        # Generic error
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to analyze code: {str(e)}"
        )


@router.get("/types")
async def get_review_types():
    """
    Get available review types
    
    Returns:
        List of available review types with descriptions
    """
    return {
        "review_types": [
            {
                "type": "general",
                "name": "General Review",
                "description": "Comprehensive review covering bugs, quality, performance, and security"
            },
            {
                "type": "security",
                "name": "Security Analysis",
                "description": "Focus on security vulnerabilities and unsafe operations"
            },
            {
                "type": "performance",
                "name": "Performance Optimization",
                "description": "Focus on algorithm efficiency and performance improvements"
            },
            {
                "type": "style",
                "name": "Code Style & Maintainability",
                "description": "Focus on code style, naming, and maintainability"
            }
        ]
    }