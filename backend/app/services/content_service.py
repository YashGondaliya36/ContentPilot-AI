"""
Content Generation Service
Business logic for content generation
"""

from typing import Dict, Any
from app.core.crew import create_content_crew
from app.utils.helpers import format_content_result, validate_topics
from app.utils.logger import setup_logger

logger = setup_logger(__name__)


class ContentService:
    """
    Service class for content generation operations
    """
    
    @staticmethod
    async def generate_content(request_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate content based on request parameters
        
        Args:
            request_data: Dictionary containing content generation parameters
                - content_topics: List of topics
                - business_goals: Business objectives
                - target_audience: Target audience
                - timeline: Publication timeline
                - content_types: Content types
                - brand_voice: Brand voice
                - additional_notes: Optional notes
        
        Returns:
            Dict: Generated content with metadata
        
        Raises:
            ValueError: If validation fails
            Exception: If content generation fails
        """
        try:
            # Validate topics
            topics = request_data.get('content_topics', [])
            if not validate_topics(topics):
                raise ValueError("Invalid or empty content topics")
            
            logger.info(f"Starting content generation for {len(topics)} topic(s)")
            logger.info(f"Topics: {', '.join(topics)}")
            
            # Create and execute crew
            crew = create_content_crew()
            result = crew.generate_content(inputs=request_data)
            
            # Format result
            formatted_result = format_content_result(result)
            formatted_result['topics'] = topics
            
            logger.info(f"Content generation successful for topics: {', '.join(topics)}")
            
            # Check if auto-send email is requested
            send_email = request_data.get('send_email', False)
            if send_email:
                recipient_email = request_data.get('recipient_email')
                
                if recipient_email:
                    logger.info(f"Auto-send email requested to: {recipient_email}")
                    
                    # Import email service here to avoid circular imports
                    from app.services.email_service import email_service
                    
                    # Generate email subject if not provided
                    email_subject = request_data.get('email_subject')
                    if not email_subject:
                        topics_str = ', '.join(topics[:2])  # First 2 topics
                        if len(topics) > 2:
                            topics_str += f" and {len(topics) - 2} more"
                        email_subject = f"Your AI-Generated Content: {topics_str}"
                    
                    # Send email
                    email_result = email_service.send_content_email(
                        to=recipient_email,
                        subject=email_subject,
                        content=formatted_result['content'],
                        topics=topics,
                        content_types=request_data.get('content_types', 'Content')
                    )
                    
                    # Add email status to result
                    formatted_result['email_sent'] = email_result['status'] == 'success'
                    formatted_result['email_status'] = email_result['message']
                    
                    if email_result['status'] == 'success':
                        logger.info(f"Email sent successfully to {recipient_email}")
                    else:
                        logger.warning(f"Email sending failed: {email_result['message']}")
                else:
                    logger.warning("send_email is True but recipient_email is missing")
                    formatted_result['email_sent'] = False
                    formatted_result['email_status'] = "Email sending failed: recipient_email is required"
            
            return formatted_result
            
        except ValueError as ve:
            logger.error(f"Validation error: {str(ve)}")
            raise
        except Exception as e:
            logger.error(f"Content generation failed: {str(e)}", exc_info=True)
            raise Exception(f"Content generation failed: {str(e)}")
    
    @staticmethod
    async def validate_request(request_data: Dict[str, Any]) -> bool:
        """
        Validate content generation request
        
        Args:
            request_data: Request data to validate
        
        Returns:
            bool: True if valid
        
        Raises:
            ValueError: If validation fails
        """
        required_fields = [
            'content_topics',
            'business_goals',
            'target_audience',
            'timeline',
            'content_types',
            'brand_voice'
        ]
        
        # Check required fields
        for field in required_fields:
            if field not in request_data or not request_data[field]:
                raise ValueError(f"Missing required field: {field}")
        
        # Validate topics
        if not validate_topics(request_data['content_topics']):
            raise ValueError("Invalid content topics")
        
        logger.info("Request validation successful")
        return True


# Create service instance
content_service = ContentService()
