"""
API Router Configuration
Aggregates all API endpoints
"""

from fastapi import APIRouter
from app.api.v1.content import router as content_router

# Create main API router
api_router = APIRouter()

# Include all sub-routers
api_router.include_router(content_router)
