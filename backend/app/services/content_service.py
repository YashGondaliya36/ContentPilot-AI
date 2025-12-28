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
