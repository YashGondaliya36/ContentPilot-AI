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
    
    # Optional: Auto-send via email after generation
    send_email: Optional[bool] = Field(
        False,
        description="If true, automatically send generated content via email",
        example=False
    )
    
    recipient_email: Optional[str] = Field(
        None,
        description="Email address to send content to (required if send_email is true)",
        pattern=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
        example="client@example.com"
    )
    
    email_subject: Optional[str] = Field(
        None,
        description="Custom email subject (optional, defaults to auto-generated)",
        min_length=1,
        max_length=200,
        example="Your AI-Generated Content from ContentPilot"
    )
    
    @validator('recipient_email')
    def validate_email_if_sending(cls, v, values):
        """Validate that recipient_email is provided if send_email is True"""
        send_email = values.get('send_email', False)
        if send_email and not v:
            raise ValueError("recipient_email is required when send_email is True")
        return v.strip().lower() if v else None
    
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
                "additional_notes": "Focus on budget-friendly options",
                "send_email": False,
                "recipient_email": None,
                "email_subject": None
            },
            "examples": [
                {
                    "name": "Generate Content Only",
                    "description": "Generate content without sending email",
                    "value": {
                        "content_topics": ["AI Content Writing"],
                        "business_goals": "Educate content creators about AI",
                        "target_audience": "Digital marketers and bloggers",
                        "timeline": "Weekly for one month",
                        "content_types": "Blog posts, Social media posts",
                        "brand_voice": "Professional and informative"
                    }
                },
                {
                    "name": "Generate and Auto-Send Email",
                    "description": "Generate content and automatically send via email",
                    "value": {
                        "content_topics": ["AI Content Writing"],
                        "business_goals": "Educate content creators about AI",
                        "target_audience": "Digital marketers and bloggers",
                        "timeline": "Weekly for one month",
                        "content_types": "Blog posts, Social media posts",
                        "brand_voice": "Professional and informative",
                        "send_email": True,
                        "recipient_email": "client@example.com",
                        "email_subject": "Your AI-Generated Content from ContentPilot"
                    }
                }
            ]
        }


class EmailSendRequest(BaseModel):
    """
    Request model for sending generated content via email
    """
    
    recipient_email: str = Field(
        ...,
        description="Email address to send the content to",
        pattern=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
        example="user@example.com"
    )
    
    subject: str = Field(
        ...,
        description="Email subject line",
        min_length=1,
        max_length=200,
        example="Your AI-Generated Content from ContentPilot"
    )
    
    content: str = Field(
        ...,
        description="The generated content to send (markdown format)",
        min_length=10,
        example="## Blog Post: Eco-Friendly Travel\\n\\nContent here..."
    )
    
    topics: List[str] = Field(
        ...,
        description="Topics that were used to generate the content",
        min_items=1,
        example=["Eco-Friendly Travel"]
    )
    
    content_types: str = Field(
        ...,
        description="Types of content included",
        example="Blog posts, Social media posts"
    )
    
    @validator('recipient_email')
    def validate_email(cls, v):
        """Validate email format"""
        if not v.strip():
            raise ValueError("Email cannot be empty")
        return v.strip().lower()
    
    class Config:
        json_schema_extra = {
            "example": {
                "recipient_email": "user@example.com",
                "subject": "Your AI-Generated Content from ContentPilot",
                "content": "## Eco-Friendly Travel Guide\\n\\nDiscover sustainable tourism...",
                "topics": ["Eco-Friendly Travel", "Sustainable Tourism"],
                "content_types": "Blog posts, Social media posts"
            }
        }


class HealthCheckResponse(BaseModel):
    """Health check response"""
    
    status: str = Field(..., example="healthy")
    app_name: str = Field(..., example="ContentPilot AI")
    version: str = Field(..., example="1.0.0")
