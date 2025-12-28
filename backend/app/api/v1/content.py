"""
Content API Endpoints
Handles content generation requests
"""

from fastapi import APIRouter, HTTPException, status
from app.models.requests import ContentGenerationRequest
from app.models.responses import ContentGenerationResponse, ErrorResponse
from app.services.content_service import content_service
from app.utils.logger import setup_logger
from datetime import datetime

logger = setup_logger(__name__)

router = APIRouter(prefix="/content", tags=["Content Generation"])


@router.post(
    "/generate",
    response_model=ContentGenerationResponse,
    status_code=status.HTTP_200_OK,
    responses={
        400: {"model": ErrorResponse, "description": "Bad Request"},
        500: {"model": ErrorResponse, "description": "Internal Server Error"}
    },
    summary="Generate Content",
    description="Generate AI-powered content based on provided parameters"
)
async def generate_content(request: ContentGenerationRequest):
    """
    Generate content using AI agents
    
    This endpoint orchestrates multiple AI agents (Researcher, Planner, Writer) to:
    1. Research the given topics
    2. Create a strategic content plan
    3. Generate publication-ready content
    
    Args:
        request: Content generation parameters
    
    Returns:
        ContentGenerationResponse: Generated content with metadata
    
    Raises:
        HTTPException: If validation or generation fails
    """
    try:
        logger.info(f"Received content generation request for topics: {request.content_topics}")
        
        # Convert to dict for service
        request_data = request.model_dump()
        
        # Generate content
        result = await content_service.generate_content(request_data)
        
        logger.info("Content generation request completed successfully")
        
        return ContentGenerationResponse(**result)
    
    except ValueError as ve:
        logger.error(f"Validation error: {str(ve)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ve)
        )
    
    except Exception as e:
        logger.error(f"Content generation error: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Content generation failed: {str(e)}"
        )


@router.get(
    "/health",
    status_code=status.HTTP_200_OK,
    summary="Content Service Health Check",
    description="Check if the content generation service is operational"
)
async def content_health():
    """
    Health check for content service
    
    Returns:
        dict: Service health status
    """
    return {
        "service": "content_generation",
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }
