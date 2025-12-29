"""
AI Tools Configuration
Search and other tools used by AI agents
"""

from langchain_core.tools import Tool
from tavily import TavilyClient
from app.config import settings
from app.utils.logger import setup_logger

logger = setup_logger(__name__)


class SearchTool:
    """Web search tool using Tavily API"""
    
    def __init__(self):
        """Initialize Tavily client"""
        try:
            self.client = TavilyClient(api_key=settings.TAVILY_API_KEY)
            logger.info("Tavily search tool initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize Tavily client: {str(e)}")
            raise
    
    def search(self, query: str) -> dict:
        """
        Perform web search
        
        Args:
            query: Search query
            
        Returns:
            dict: Search results
        """
        try:
            logger.info(f"Performing search for query: {query}")
            results = self.client.search(
                query=query,
                max_results=settings.SEARCH_MAX_RESULTS,
                search_depth=settings.SEARCH_DEPTH
            )
            logger.info(f"Search completed successfully for query: {query}")
            return results
        except Exception as e:
            logger.error(f"Search failed for query '{query}': {str(e)}")
            raise


# Initialize search tool instance
_search_tool_instance = SearchTool()


# Create LangChain tool
search_tool = Tool(
    name="Search",
    func=_search_tool_instance.search,
    description="Search the web for latest high demanding content, trends, and information about topics"
)
