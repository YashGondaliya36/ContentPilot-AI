"""
Request Models
Pydantic models for API request validation
"""

from pydantic import BaseModel, Field, validator
from typing import List, Optional


class ContentGenerationRequest(BaseModel):
    """
    Request model for content generation
    """
    
    content_topics: List[str] = Field(
        ...,
        description="List of topics to create content about",
        min_items=1,
        max_items=5,
        example=["Eco-Friendly Travel", "Sustainable Tourism"]
    )
    
    business_goals: str = Field(
        ...,
        description="What you want to achieve with the content",
        min_length=5,
        max_length=500,
        example="Increase brand awareness and drive more eco-tour bookings"
    )
    
    target_audience: str = Field(
        ...,
        description="Who the content is for",
        min_length=5,
        max_length=500,
        example="Environmentally conscious travelers aged 25-45"
    )
    
    timeline: str = Field(
        ...,
        description="Publication timeline for the content",
        min_length=3,
        max_length=200,
        example="Weekly for one month"
    )
    
    content_types: str = Field(
        ...,
        description="Types of content to create (comma-separated)",
        min_length=3,
        max_length=200,
        example="Blog posts, Social media posts"
    )
    
    brand_voice: str = Field(
        ...,
        description="How the content should sound/tone",
        min_length=3,
        max_length=200,
        example="Friendly and helpful"
    )
    
    additional_notes: Optional[str] = Field(
        "",
        description="Any extra instructions or requirements",
        max_length=500,
        example="Focus on budget-friendly options"
    )
    
    @validator('content_topics')
    def validate_topics(cls, v):
        """Validate that all topics are non-empty"""
        if not all(topic.strip() for topic in v):
            raise ValueError("All topics must be non-empty strings")
        return [topic.strip() for topic in v]
    
    @validator('business_goals', 'target_audience', 'timeline', 'content_types', 'brand_voice')
    def validate_non_empty(cls, v):
        """Validate that fields are not just whitespace"""
        if not v.strip():
            raise ValueError("Field cannot be empty or whitespace")
        return v.strip()
    
    class Config:
        json_schema_extra = {
            "example": {
                "content_topics": ["Eco-Friendly Travel", "Sustainable Tourism"],
                "business_goals": "Increase brand awareness and drive more eco-tour bookings",
                "target_audience": "Environmentally conscious travelers aged 25-45",
                "timeline": "Weekly for one month",
                "content_types": "Blog posts, Social media posts",
                "brand_voice": "Friendly and helpful",
                "additional_notes": "Focus on budget-friendly options"
            }
        }


class HealthCheckResponse(BaseModel):
    """Health check response"""
    
    status: str = Field(..., example="healthy")
    app_name: str = Field(..., example="ContentPilot AI")
    version: str = Field(..., example="1.0.0")
