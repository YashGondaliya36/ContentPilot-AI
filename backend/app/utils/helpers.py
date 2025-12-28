"""
Helper Utilities
Common utility functions used across the application
"""

from typing import Any, Dict, Optional
from datetime import datetime
import json


def format_timestamp(dt: Optional[datetime] = None) -> str:
    """
    Format datetime to ISO 8601 string
    
    Args:
        dt: Datetime object (defaults to now)
        
    Returns:
        str: Formatted timestamp
    """
    if dt is None:
        dt = datetime.now()
    return dt.isoformat()


def sanitize_text(text: str) -> str:
    """
    Sanitize text by removing extra whitespace and newlines
    
    Args:
        text: Input text
        
    Returns:
        str: Sanitized text
    """
    # Remove extra whitespace
    text = ' '.join(text.split())
    return text.strip()


def format_content_result(result: Any) -> Dict[str, Any]:
    """
    Format CrewAI result into a structured response
    
    Args:
        result: CrewAI output
        
    Returns:
        Dict: Formatted result
    """
    return {
        "content": str(result),
        "generated_at": format_timestamp(),
        "status": "success"
    }


def validate_topics(topics: list) -> bool:
    """
    Validate content topics
    
    Args:
        topics: List of topics
        
    Returns:
        bool: True if valid
    """
    if not topics or len(topics) == 0:
        return False
    
    # Check if all topics are non-empty strings
    return all(isinstance(topic, str) and topic.strip() for topic in topics)


def truncate_text(text: str, max_length: int = 100, suffix: str = "...") -> str:
    """
    Truncate text to maximum length
    
    Args:
        text: Input text
        max_length: Maximum length
        suffix: Suffix to add if truncated
        
    Returns:
        str: Truncated text
    """
    if len(text) <= max_length:
        return text
    return text[:max_length - len(suffix)] + suffix
