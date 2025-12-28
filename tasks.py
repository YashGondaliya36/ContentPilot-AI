from crewai import Task
from agents import researcher, planner, writer

# Define tasks
research_task = Task(
    description="""
    Research these topics: {content_topics}
    
    Find:
    1. Current trends
    2. What people want to know
    3. Useful facts and examples
    
    Keep it simple and practical.
    """,
    agent=researcher,
    expected_output="List of trends, audience interests, and useful facts"
)

planning_task = Task(
    description="""
    Create a simple content plan for: {content_topics}
    
    Include:
    1. Topics to cover
    2. Content types to create
    3. When to publish each piece{timeline}
    4. Goals for each content piece
    
    The audience is: {target_audience}
    The goals are: {business_goals}
    The brand voice is: {brand_voice}
    """,
    agent=planner,
    expected_output="Simple content plan with topics and according to contain all{timeline} and goals"
)

writing_task = Task(
    description="""
    Write content about: {content_topics}
    
    Create:
    1. One complete example of each content type listed: {content_types}
    2. Make it appeal to: {target_audience}
    3. Use this voice: {brand_voice}
    4. Include helpful examples and tips
    
    Additional notes: {additional_notes}

    """,
    agent=writer,
    expected_output="Complete content examples ready to use"
) 

