# ContentPilot AI

An intelligent content creation platform powered by a crew of AI agents.

## Overview

ContentPilot AI automates the content creation process with a team of specialized AI agents:

- **Researcher**: Gathers trending information and audience interests 
- **Planner**: Creates strategic content plans aligned with business goals
- **Writer**: Crafts engaging content tailored to your target audience

## Features

- Generate complete content plans and examples
- Customize content types (blog posts, social media, and more) 
- Specify publication timelines
- Define target audience and brand voice
- Beautiful Streamlit interface for easy interaction

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Create a `.env` file with your API keys:
   ```
   GOOGLE_API_KEY=your_google_api_key
   TAVILY_API_KEY=your_tavily_api_key
   ```

## Usage

Run the Streamlit app:
```
streamlit run main.py
```

This will open the ContentPilot AI interface in your browser where you can:
1. Select your content topics
2. Define your business goals
3. Specify your target audience
4. Choose content types and publication timeline
5. Set your brand voice
6. Click "Generate Content" to start the AI crew

## Project Structure

- `main.py` - Main application with Streamlit UI
- `agents.py` - Definitions for AI agents (researcher, planner, writer)
- `tasks.py` - Task definitions for each agent
- `tools.py` - Search tools and utilities

## Customization

You can customize the AI agents, tasks, and tools by editing their respective files:
- Modify `agents.py` to change agent behaviors
- Update `tasks.py` to adjust the prompts and instructions
- Enhance `tools.py` to add new capabilities

## License

This project is licensed under the MIT License - see the LICENSE file for details.