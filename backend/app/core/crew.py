"""
Crew Orchestration
Manages the CrewAI team execution and workflow
"""

from crewai import Crew, Process
from typing import Dict, Any
from app.core.agents import researcher, planner, writer
from app.core.tasks import research_task, planning_task, writing_task
from app.utils.logger import setup_logger

logger = setup_logger(__name__)


class ContentCrew:
    """
    Content generation crew orchestrator
    Manages the execution of AI agents to generate content
    """
    
    def __init__(self):
        """Initialize the content generation crew"""
        self.crew = Crew(
            agents=[researcher, planner, writer],
            tasks=[research_task, planning_task, writing_task],
            process=Process.sequential,
            verbose=True
        )
        logger.info("ContentCrew initialized with sequential process")
    
    def generate_content(self, inputs: Dict[str, Any]) -> Any:
        """
        Execute the crew to generate content
        
        Args:
            inputs: Dictionary containing all required inputs:
                - content_topics: List of topics
                - business_goals: Business objectives
                - target_audience: Target audience description
                - timeline: Publication timeline
                - content_types: Types of content to create
                - brand_voice: Brand voice/tone
                - additional_notes: Optional additional instructions
        
        Returns:
            CrewOutput: Generated content
        """
        try:
            logger.info(f"Starting content generation for topics: {inputs.get('content_topics')}")
            logger.info(f"Content types: {inputs.get('content_types')}")
            
            # Execute crew
            result = self.crew.kickoff(inputs=inputs)
            
            logger.info("Content generation completed successfully")
            return result
            
        except Exception as e:
            logger.error(f"Content generation failed: {str(e)}")
            raise


def create_content_crew() -> ContentCrew:
    """
    Factory function to create a new ContentCrew instance
    
    Returns:
        ContentCrew: New content crew instance
    """
    return ContentCrew()
