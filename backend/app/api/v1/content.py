"""
Content API Endpoints
Handles content generation requests
"""

from fastapi import APIRouter, HTTPException, status
from app.models.requests import ContentGenerationRequest, EmailSendRequest
from app.models.responses import ContentGenerationResponse, ErrorResponse, EmailSendResponse
from app.services.content_service import content_service
from app.services.email_service import email_service
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
    4. Optionally send content via email (if send_email is True)
    
    **Auto-Send Email Feature:**
    Set `send_email: true` with `recipient_email` to automatically send the generated 
    content via email after generation. Email will include beautiful HTML formatting.
    
    **Examples:**
    
    1. Generate content only (no email):
    ```json
    {
      "content_topics": ["AI Writing"],
      "business_goals": "Educate audience",
      "target_audience": "Content creators",
      "timeline": "Weekly",
      "content_types": "Blog posts",
      "brand_voice": "Professional"
    }
    ```
    
    2. Generate content AND send email:
    ```json
    {
      "content_topics": ["AI Writing"],
      "business_goals": "Educate audience",
      "target_audience": "Content creators",
      "timeline": "Weekly",
      "content_types": "Blog posts",
      "brand_voice": "Professional",
      "send_email": true,
      "recipient_email": "client@example.com",
      "email_subject": "Your Custom Content" 
    }
    ```
    
    Args:
        request: Content generation parameters (with optional email fields)
    
    Returns:
        ContentGenerationResponse: Generated content with metadata and email status
    
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


@router.post(
    "/send-email",
    response_model=EmailSendResponse,
    status_code=status.HTTP_200_OK,
    responses={
        400: {"model": ErrorResponse, "description": "Bad Request"},
        500: {"model": ErrorResponse, "description": "Internal Server Error"}
    },
    summary="Send Content via Email",
    description="Send AI-generated content to a recipient via email"
)
async def send_content_email(request: EmailSendRequest):
    """
    Send generated content via email
    
    This endpoint sends the AI-generated content to a specified email address
    with beautiful HTML formatting.
    
    Features:
    - Beautiful HTML email template
    - Markdown to HTML conversion
    - Plain text fallback
    - Professional styling
    
    Args:
        request: Email send parameters (recipient, subject, content)
    
    Returns:
        EmailSendResponse: Send status and confirmation
    
    Raises:
        HTTPException: If validation or sending fails
    """
    try:
        logger.info(f"Received email send request for: {request.recipient_email}")
        
        # Send email
        result = email_service.send_content_email(
            to=request.recipient_email,
            subject=request.subject,
            content=request.content,
            topics=request.topics,
            content_types=request.content_types
        )
        
        if result["status"] == "success":
            logger.info(f"Email sent successfully to {request.recipient_email}")
            return EmailSendResponse(**result)
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=result["message"]
            )
    
    except ValueError as ve:
        logger.error(f"Validation error: {str(ve)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ve)
        )
    
    except HTTPException:
        raise
    
    except Exception as e:
        logger.error(f"Email send error: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send email: {str(e)}"
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
