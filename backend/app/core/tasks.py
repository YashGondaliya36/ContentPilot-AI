"""
AI Tasks Configuration
Defines all tasks for the content generation pipeline
"""

from crewai import Task
from app.core.agents import researcher, planner, writer
from app.utils.logger import setup_logger

logger = setup_logger(__name__)


# Research Task
research_task = Task(
    description="""
    Conduct comprehensive research on the following topics: {content_topics}
    
    Your research should uncover:
    1. **Current Trends**: What's trending right now related to these topics? What are people talking about?
    2. **Audience Interests**: What questions are people asking? What problems are they trying to solve?
    3. **Content Opportunities**: What types of content are performing well? What angles are unique?
    4. **Key Facts & Data**: Find statistics, examples, and credible information to support content creation
    5. **Competitive Analysis**: What are similar brands/creators doing well?
    
    Target Audience: {target_audience}
    Business Goals: {business_goals}
    
    Provide actionable insights that will inform content strategy and creation.
    Focus on practical, relevant information that can be directly used in content.
    """,
    agent=researcher,
    expected_output="""A comprehensive research report including:
    - List of current trends and trending topics
    - Key audience interests and pain points
    - Content opportunities and angles
    - Relevant facts, statistics, and examples
    - Competitive insights and best practices
    """
)


# Planning Task
planning_task = Task(
    description="""
    Based on the research findings, create a strategic content plan for: {content_topics}
    
    Your content plan should include:
    1. **Content Topics**: Specific topics/themes to cover, prioritized by relevance and impact
    2. **Content Types**: Which format works best for each topic ({content_types})
    3. **Publication Schedule**: When to publish each piece based on {timeline}
    4. **Content Goals**: What each piece should achieve (awareness, engagement, conversion, etc.)
    5. **Key Messages**: Main points to communicate in each piece
    6. **Call-to-Actions**: What action should the audience take
    
    Consider:
    - Target Audience: {target_audience}
    - Business Goals: {business_goals}
    - Brand Voice: {brand_voice}
    - Timeline: {timeline}
    
    Create a practical, easy-to-follow plan that guides content creation.
    """,
    agent=planner,
    expected_output="""A detailed content plan including:
    - Prioritized list of content topics with rationale
    - Content type recommendations for each topic
    - Publication schedule covering the full {timeline}
    - Specific goals and KPIs for each content piece
    - Key messages and angles for each piece
    - Recommended CTAs and engagement strategies
    """
)


# Writing Task
writing_task = Task(
    description="""
    Create high-quality, engaging content about: {content_topics}
    
    Generate complete, ready-to-publish examples for each content type: {content_types}
    
    Requirements:
    1. **Audience-Focused**: Write specifically for {target_audience}
    2. **Brand Voice**: Use this tone and style: {brand_voice}
    3. **Value-Driven**: Include helpful tips, examples, and actionable insights
    4. **Engaging**: Use storytelling, questions, and relatable examples
    5. **Formatted**: Proper structure with headlines, subheadings, and formatting
    6. **Complete**: Each piece should be ready to publish with minimal editing
    
    Additional Guidelines: {additional_notes}
    
    For each content piece:
    - Create attention-grabbing headlines
    - Write compelling introductions
    - Provide valuable, well-organized content
    - Include relevant examples and data points
    - End with clear calls-to-action
    
    Make sure each piece aligns with the overall content strategy and business goals.
    """,
    agent=writer,
    expected_output="""Complete, publication-ready content including:
    - Full content pieces for each specified content type
    - Headlines and subheadings
    - Properly formatted and structured content
    - Examples, tips, and actionable insights
    - Engaging introductions and conclusions
    - Clear calls-to-action
    - Ready to publish with minimal editing required
    """
)


logger.info("All AI tasks initialized successfully")
