from crewai import Crew, Process
from agents import researcher, planner, writer
from tasks import research_task, planning_task, writing_task
import streamlit as st

def generate_content(
    content_topics,
    business_goals,
    target_audience,
    timeline,
    content_types,
    brand_voice,
    additional_notes=""
):
    """
    Generate content using the ContentPilot AI crew
    
    Args:
        content_topics (list): List of topics to create content about
        business_goals (str): What you want to achieve with the content
        target_audience (str): Who the content is for
        timeline (str): When to publish content
        content_types (str): Types of content to create
        brand_voice (str): How the content should sound
        additional_notes (str): Any extra instructions
    
    Returns:
        str: Generated content and plans
    """
    # Setup the crew with all agents 
    content_team = Crew(
        agents=[researcher, planner, writer],
        tasks=[research_task, planning_task, writing_task],
        process=Process.sequential,
        verbose=True
    )

    # Run the crew with inputs
    result = content_team.kickoff(
        inputs={
            "content_topics": content_topics,
            "business_goals": business_goals,
            "target_audience": target_audience,
            "timeline": timeline,
            "content_types": content_types,
            "brand_voice": brand_voice,
            "additional_notes": additional_notes
        }
    )
    
    # Convert the CrewOutput to a string
    return str(result)


if __name__ == "__main__":
    # Run as Streamlit app
    
    # Set page configuration
    st.set_page_config(
        page_title="ContentPilot AI",
        page_icon="✍️",
        layout="wide",
        initial_sidebar_state="expanded"
    )

    # Custom CSS for styling
    st.markdown("""
    <style>
        .main-header {
            font-size: 25rem;  
            color: #1E88E5;
            font-weight: 700;  
            text-transform: uppercase;
            letter-spacing: 4px;  
            text-align: center;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);  
        }
        .sub-header {
            font-size: 2rem;  
            color: #42A5F5;
            font-weight: 500;
            text-align: center;
            margin-bottom: 2rem;
        }
        .section-header {
            font-size: 1.2rem;
            color: #64B5F6;
            font-weight: 500;
            margin-top: 1rem;
        }
        .output-container {
            background-color: #f0f8ff;
            border-radius: 10px;
            padding: 20px;
            border-left: 5px solid #1E88E5;
        }
        .stTabs [data-baseweb="tab-list"] {
            gap: 2px;
        }
        .stTabs [data-baseweb="tab"] {
            height: 50px;
            white-space: pre-wrap;
            background-color: #f0f8ff;
            border-radius: 4px 4px 0px 0px;
            gap: 1px;
            padding-left: 10px;
            padding-right: 10px;
        }
        .stTabs [aria-selected="true"] {
            background-color: #1E88E5 !important;
            color: white !important;
        }
        .generate-btn:hover {
            background-color: #1565C0;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .hero-section {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 2rem;
        }
        .icon-text {
            font-size: 3rem;
            margin: 0 0.5rem;
        }
        .features-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-bottom: 2rem;
        }
        .feature-card {
            background-color: rgba(30, 136, 229, 0.1);
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            border: 1px solid rgba(30, 136, 229, 0.2);
        }
        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        .feature-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #1E88E5;
        }
        .feature-desc {
            font-size: 1rem;
            color: #555;
        }
    </style>
    """, unsafe_allow_html=True)

    # App header with logo icons
    st.markdown('<div class="hero-section"><span class="icon-text"></span><p class="main-header">ContentPilot AI</p><span class="icon-text"></span></div>', unsafe_allow_html=True)
    st.markdown('<p class="sub-header">Generate high-quality content with AI</p>', unsafe_allow_html=True)

    # Feature highlights in the main UI
    st.markdown("""
    <div class="features-grid">
        <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <div class="feature-title">Research</div>
            <div class="feature-desc">Our AI researcher finds the latest trends and insights for your topics</div>
        </div>
        <div class="feature-card">
            <div class="feature-icon">📋</div>
            <div class="feature-title">Plan</div>
            <div class="feature-desc">Create strategic content plans aligned with your business goals</div>
        </div>
        <div class="feature-card">
            <div class="feature-icon">📝</div>
            <div class="feature-title">Create</div>
            <div class="feature-desc">Generate engaging content tailored to your audience and brand voice</div>
        </div>
    </div>
    """, unsafe_allow_html=True)


    with st.sidebar:
        st.markdown('<p class="section-header">Content Parameters</p>', unsafe_allow_html=True)
        
        
        st.subheader("Content Topics")
        num_topics = st.number_input("Number of topics", min_value=1, max_value=5, value=1)
        topics = []
        for i in range(num_topics):
            topic = st.text_input(f"Topic {i+1}", value="" if i > 0 else "Eco-Friendly Travel")
            if topic:
                topics.append(topic)
        
        
        st.subheader("Business Goals")
        business_goals = st.text_area(
            "What do you want to achieve?",
            value="Get more customers for eco-tours",
            help="Describe your business objectives"
        )
        
        
        st.subheader("Target Audience")
        target_audience = st.text_area(
            "Who is your content for?",
            value="People who care about the environment",
            help="Describe your target audience"
        )
        
        
        st.subheader("Publication Timeline")
        timeline_options = [
            "Weekly for one month",
            "Bi-weekly for two months",
            "Monthly for three months",
            "Daily for one week",
            "Custom"
        ]
        timeline_selection = st.selectbox("Select timeline", timeline_options)
        
        if timeline_selection == "Custom":
            timeline = st.text_input("Enter custom timeline", "for a month 1 day of each week")
        else:
            timeline = timeline_selection
        
        
        st.subheader("Content Types")
        content_type_options = [
            "Blog posts",
            "Social media posts",
            "Email newsletters",
            "Video scripts",
            "Podcast scripts",
            "Infographics"
        ]
        selected_content_types = st.multiselect(
            "Select content types",
            content_type_options,
            default=["Blog posts", "Social media posts"]
        )
        content_types = ", ".join(selected_content_types)
        
        
        st.subheader("Brand Voice")
        voice_options = [
            "Friendly and helpful",
            "Professional and authoritative",
            "Casual and conversational",
            "Technical and detailed",
            "Inspirational and motivational",
            "Custom"
        ]
        voice_selection = st.selectbox("Select brand voice", voice_options)
        
        if voice_selection == "Custom":
            brand_voice = st.text_input("Enter custom brand voice", "Friendly and helpful")
        else:
            brand_voice = voice_selection
        
        
        st.subheader("Additional Notes")
        additional_notes = st.text_area(
            "Any other instructions?",
            help="Add any other special instructions"
        )
        




    generate_clicked = st.button("🚀 Generate Content ", key="hidden_generate", help="Generate content based on your inputs")

    
    if generate_clicked:
        if not topics:
            st.error("Please enter at least one content topic.")
        else:
            with st.spinner("🧠 AI magic happening ! Almost there..."):
                try:
                   
                    result = generate_content(
                        content_topics=topics,
                        business_goals=business_goals,
                        target_audience=target_audience,
                        timeline=timeline,
                        content_types=content_types,
                        brand_voice=brand_voice,
                        additional_notes=additional_notes
                    )
                    
                    
                    st.session_state.content_result = result
                    
                except Exception as e:
                    st.error(f"An error occurred: {str(e)}")

    
    if "content_result" in st.session_state:
        st.header("Generated Content ✨",divider='rainbow')
        
        st.markdown(st.session_state.content_result)
        st.markdown('</div>', unsafe_allow_html=True)
        
        
        st.download_button(
            label="Download Content",
            data=st.session_state.content_result,
            file_name="ContentPilot_Content.txt",
            mime="text/plain"
        )
        
        
        if st.button("Clear Results"):
            del st.session_state.content_result 