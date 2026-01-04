"""
AI Tools Configuration
Search and other tools used by AI agents
"""

from crewai.tools import tool
from tavily import TavilyClient
from app.config import settings
from app.utils.logger import setup_logger

logger = setup_logger(__name__)

class SearchTools:
    @tool("Search")
    def search(query: str):
        """Search the web for latest high demanding content, trends, and information about topics.
        Useful for finding current events, market trends, and specific information."""
        try:
            logger.info(f"Performing search for query: {query}")
            client = TavilyClient(api_key=settings.TAVILY_API_KEY)
            results = client.search(
                query=query,
                max_results=settings.SEARCH_MAX_RESULTS,
                search_depth=settings.SEARCH_DEPTH
            )
            logger.info(f"Search completed successfully for query: {query}")
            return str(results)
        except Exception as e:
            logger.error(f"Search failed for query '{query}': {str(e)}")
            return f"Search failed: {str(e)}"

# Export the tool instance
search_tool = SearchTools.search
