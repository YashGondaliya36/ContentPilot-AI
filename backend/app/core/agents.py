"""
AI Agents Configuration
Defines all AI agents used in the content generation pipeline
"""

from crewai import Agent, LLM
from app.config import settings
from app.core.tools import search_tool
from app.utils.logger import setup_logger

logger = setup_logger(__name__)


def get_llm() -> LLM:
    """
    Get configured LLM instance
    
    Returns:
        LLM: Configured language model
    """
    try:
        llm = LLM(
            model=settings.LLM_MODEL,
            api_key=settings.GOOGLE_API_KEY,
            max_tokens=settings.LLM_MAX_TOKENS,
            temperature=settings.LLM_TEMPERATURE
        )
        logger.info(f"LLM initialized: {settings.LLM_MODEL}")
        return llm
    except Exception as e:
        logger.error(f"Failed to initialize LLM: {str(e)}")
        raise


# Initialize LLM
gemini = get_llm()


# Define Researcher Agent
researcher = Agent(
    role="Content Researcher",
    goal="Find valuable, trending social media content and insights",
    backstory="""You are an expert content researcher with deep knowledge of social media trends,
    audience behavior, and viral content patterns. You excel at finding relevant, up-to-date
    information that resonates with target audiences. You use web search to discover the latest
    trends, popular topics, and engaging content ideas.""",
    tools=[search_tool],
    llm=gemini,
    verbose=True
)


# Define Planner Agent
planner = Agent(
    role="Content Strategist & Planner",
    goal="Create strategic, actionable content plans aligned with business goals",
    backstory="""You are a seasoned content strategist with expertise in content marketing,
    editorial planning, and audience engagement. You create detailed content calendars that
    balance business objectives with audience needs. You understand content distribution,
    timing, and how to structure content for maximum impact across different platforms.""",
    tools=[search_tool],
    llm=gemini,
    verbose=True
)


# Define Writer Agent
writer = Agent(
    role="Creative Content Writer",
    goal="Craft engaging, high-quality content that resonates with the target audience",
    backstory="""You are a talented content writer who creates compelling, engaging content
    across multiple formats. You understand how to adapt tone and style for different audiences
    and platforms. Your content is clear, persuasive, and designed to drive action. You excel
    at storytelling, using examples, and making complex topics accessible and interesting.""",
    llm=gemini,
    verbose=True
)


logger.info("All AI agents initialized successfully")
