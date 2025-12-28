"""
FastAPI Main Application
Entry point for the ContentPilot AI backend API
"""

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.api.v1.routes import api_router
from app.config import settings
from app.models.requests import HealthCheckResponse
from app.utils.logger import setup_logger
from datetime import datetime

logger = setup_logger(__name__)

# Create FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="""
    ContentPilot AI - AI-Powered Content Generation Platform
    
    This API provides endpoints for generating high-quality content using advanced AI agents.
    
    ## Features
    
    * 🔍 **Research**: AI-powered web research for trending topics
    * 📋 **Planning**: Strategic content planning and scheduling
    * 📝 **Writing**: Professional content creation across multiple formats
    
    ## Workflow
    
    1. Submit your content requirements
    2. AI agents research, plan, and create content
    3. Receive publication-ready content
    
    ## API Documentation
    
    - **OpenAPI Spec**: `/docs` (Swagger UI)
    - **ReDoc**: `/redoc` (Alternative documentation)
    """,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url=f"{settings.API_V1_PREFIX}/openapi.json"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=settings.CORS_ALLOW_CREDENTIALS,
    allow_methods=settings.CORS_ALLOW_METHODS,
    allow_headers=settings.CORS_ALLOW_HEADERS,
)


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Handle uncaught exceptions"""
    logger.error(f"Unhandled exception: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "status": "error",
            "error": "Internal server error",
            "detail": str(exc) if settings.DEBUG else "An unexpected error occurred",
            "timestamp": datetime.now().isoformat()
        }
    )


# Include API router
app.include_router(api_router, prefix=settings.API_V1_PREFIX)


# Root endpoint
@app.get(
    "/",
    response_model=HealthCheckResponse,
    tags=["Health"],
    summary="Root Endpoint",
    description="Welcome endpoint with API information"
)
async def root():
    """
    Root endpoint
    
    Returns:
        HealthCheckResponse: API health and version information
    """
    logger.info("Root endpoint accessed")
    return HealthCheckResponse(
        status="healthy",
        app_name=settings.APP_NAME,
        version=settings.APP_VERSION
    )


# Health check endpoint
@app.get(
    "/health",
    tags=["Health"],
    summary="Health Check",
    description="Check if the API is running properly"
)
async def health_check():
    """
    Health check endpoint
    
    Returns:
        dict: Service health status
    """
    return {
        "status": "healthy",
        "app_name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "timestamp": datetime.now().isoformat()
    }


# Startup event
@app.on_event("startup")
async def startup_event():
    """Application startup"""
    logger.info(f"Starting {settings.APP_NAME} v{settings.APP_VERSION}")
    logger.info(f"API documentation available at: http://{settings.HOST}:{settings.PORT}/docs")


# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """Application shutdown"""
    logger.info(f"Shutting down {settings.APP_NAME}")


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level=settings.LOG_LEVEL.lower()
    )
