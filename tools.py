from langchain.tools import Tool
from tavily import TavilyClient
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Tavily client
tavily_client = TavilyClient(os.getenv('TAVILY_API_KEY'))

def search(query):
    """Basic web search using Tavily"""
    results = tavily_client.search(
        query=query, 
        max_results=3,
        search_depth='advanced'
    )
    return results

# Create search tool
search_tool = Tool(
    name="Search",
    func=search,
    description="Search latest high demanding content"
) 