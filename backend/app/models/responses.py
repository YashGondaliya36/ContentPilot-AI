"""
Response Models
Pydantic models for API responses
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ContentGenerationResponse(BaseModel):
    """
    Response model for content generation
    """
    
    status: str = Field(
        ...,
        description="Status of the content generation",
        example="success"
    )
    
    content: str = Field(
        ...,
        description="Generated content",
        example="## Blog Post: Eco-Friendly Travel\\n\\nDiscover sustainable tourism..."
    )
    
    generated_at: str = Field(
        ...,
        description="Timestamp when content was generated (ISO 8601)",
        example="2025-12-28T16:45:00"
    )
    
    topics: list = Field(
        ...,
        description="Topics that were processed",
        example=["Eco-Friendly Travel"]
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "status": "success",
                "content": "## Generated Content\\n\\n### Blog Post: Eco-Friendly Travel\\n\\nContent here...",
                "generated_at": "2025-12-28T16:45:00",
                "topics": ["Eco-Friendly Travel", "Sustainable Tourism"]
            }
        }


class ErrorResponse(BaseModel):
    """
    Error response model
    """
    
    status: str = Field(
        default="error",
        description="Status of the request",
        example="error"
    )
    
    error: str = Field(
        ...,
        description="Error message",
        example="Invalid request parameters"
    )
    
    detail: Optional[str] = Field(
        None,
        description="Detailed error information",
        example="content_topics field is required"
    )
    
    timestamp: str = Field(
        ...,
        description="Timestamp when error occurred (ISO 8601)",
        example="2025-12-28T16:45:00"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "status": "error",
                "error": "Validation Error",
                "detail": "content_topics field is required",
                "timestamp": "2025-12-28T16:45:00"
            }
        }


class TaskStatusResponse(BaseModel):
    """
    Task status response for async operations (future use)
    """
    
    task_id: str = Field(..., description="Unique task identifier")
    status: str = Field(..., description="Task status (pending, processing, completed, failed)")
    created_at: str = Field(..., description="Task creation timestamp")
    updated_at: str = Field(..., description="Last update timestamp")
    result: Optional[dict] = Field(None, description="Task result if completed")
