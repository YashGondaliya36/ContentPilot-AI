from crewai import Agent, LLM
import os
from dotenv import load_dotenv
from tools import search_tool

load_dotenv()

# Initialize 
gemini = LLM(
    model="gemini/gemini-2.0-flash",
    api_key=os.getenv('GOOGLE_API_KEY'),
    max_tokens=4096
)

# Define agents
researcher = Agent(
    role="Researcher",
    goal="Find useful information",
    backstory="You find helpful information online",
    tools=[search_tool],
    llm=gemini,
    verbose=False
)

planner = Agent(
    role="Planner",
    goal="Make simple content plans",
    backstory="You create easy-to-follow content plans",
    tools=[search_tool],
    llm=gemini,
    verbose=False
)

writer = Agent(
    role="Writer",
    goal="Create engaging content",
    backstory="You write content people enjoy reading",
    llm=gemini,
    verbose=False
) 