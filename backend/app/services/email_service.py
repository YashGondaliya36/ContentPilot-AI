"""
Email Service for ContentPilot AI
Uses Gmail API with OAuth
"""

import base64
from pathlib import Path
from typing import Dict
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from app.utils.logger import setup_logger
import markdown2

logger = setup_logger(__name__)

# Gmail API scopes
GMAIL_SCOPES = ['https://www.googleapis.com/auth/gmail.send']


class EmailService:
    """
    Email service using Gmail API with OAuth
    """
    
    def __init__(self):
        """Initialize Gmail API service"""
        self.gmail_service = None
        self._authenticate_gmail()
    
    def _authenticate_gmail(self):
        """Authenticate with Gmail API using OAuth"""
        try:
            creds = None
            
            # Paths for credentials
            backend_dir = Path(__file__).parent.parent.parent
            token_file = backend_dir / 'token.json'
            credentials_file = backend_dir / 'credentials.json'
            
            logger.info(f"Looking for credentials at: {credentials_file}")
            
            # Check for existing token
            if token_file.exists():
                logger.info("Found existing token.json")
                creds = Credentials.from_authorized_user_file(str(token_file), GMAIL_SCOPES)
            
            # Refresh or get new credentials
            if not creds or not creds.valid:
                if creds and creds.expired and creds.refresh_token:
                    logger.info("Refreshing expired credentials")
                    creds.refresh(Request())
                else:
                    if not credentials_file.exists():
                        logger.error(f"credentials.json not found at: {credentials_file}")
                        raise FileNotFoundError(
                            f"\n❌ Gmail credentials not found!\n"
                            f"Expected location: {credentials_file}\n\n"
                            f"Please:\n"
                            f"1. Go to https://console.cloud.google.com\n"
                            f"2. Enable Gmail API\n"
                            f"3. Create OAuth Desktop credentials\n"
                            f"4. Download credentials.json\n"
                            f"5. Place it in the backend/ folder\n"
                        )
                    
                    logger.info("Starting OAuth flow - browser will open")
                    flow = InstalledAppFlow.from_client_secrets_file(
                        str(credentials_file), GMAIL_SCOPES
                    )
                    creds = flow.run_local_server(port=0)
                
                # Save credentials
                token_file.write_text(creds.to_json())
                logger.info("Credentials saved to token.json")
            
            self.gmail_service = build('gmail', 'v1', credentials=creds)
            logger.info("✅ Gmail API authenticated successfully!")
            
        except Exception as e:
            logger.error(f"Gmail authentication failed: {str(e)}")
            raise
    
    def send_content_email(
        self,
        to: str,
        subject: str,
        content: str,
        topics: list,
        content_types: str
    ) -> Dict[str, any]:
        """
        Send generated content via Gmail API
        
        Args:
            to: Recipient email address
            subject: Email subject
            content: Generated content (markdown format)
            topics: List of topics
            content_types: Types of content generated
        
        Returns:
            Dict with status and message
        """
        try:
            logger.info(f"Preparing email for {to}")
            
            # Generate HTML and text versions
            html_body = self._create_html_email(content, topics, content_types)
            text_body = self._create_text_email(content, topics, content_types)
            
            # Create multipart message
            message = MIMEMultipart('alternative')
            message['to'] = to
            message['subject'] = subject
            
            # Add both text and HTML versions
            part1 = MIMEText(text_body, 'plain')
            part2 = MIMEText(html_body, 'html')
            
            message.attach(part1)
            message.attach(part2)
            
            # Encode and send
            raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
            
            self.gmail_service.users().messages().send(
                userId='me',
                body={'raw': raw}
            ).execute()
            
            logger.info(f"✅ Email sent successfully to {to}")
            
            return {
                "status": "success",
                "message": f"Content successfully sent to {to}",
                "timestamp": datetime.now().isoformat()
            }
            
        except HttpError as error:
            logger.error(f"Gmail API error: {error}")
            return {
                "status": "error",
                "message": f"Gmail API error: {str(error)}",
                "timestamp": datetime.now().isoformat()
            }
        except Exception as e:
            logger.error(f"Error sending email: {str(e)}", exc_info=True)
            return {
                "status": "error",
                "message": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    def _create_html_email(self, content: str, topics: list, content_types: str) -> str:
        """Create beautiful HTML email from markdown content"""
        
        # Convert markdown to HTML
        content_html = markdown2.markdown(content, extras=["tables", "fenced-code-blocks"])
        
        html = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }}
        .email-container {{
            background-color: white;
            border-radius: 10px;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }}
        .header {{
            border-bottom: 3px solid #1E88E5;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }}
        .header h1 {{
            color: #1E88E5;
            margin: 0;
            font-size: 28px;
        }}
        .meta-info {{
            background-color: #f0f8ff;
            border-left: 4px solid #1E88E5;
            padding: 15px 20px;
            margin: 20px 0;
            border-radius: 5px;
        }}
        .meta-info p {{
            margin: 5px 0;
            color: #555;
        }}
        .meta-info strong {{
            color: #1E88E5;
        }}
        .content {{
            margin-top: 30px;
        }}
        .content h2 {{
            color: #1E88E5;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 10px;
        }}
        .content h3 {{
            color: #42A5F5;
        }}
        .content p {{
            margin: 15px 0;
        }}
        .content ul, .content ol {{
            padding-left: 25px;
        }}
        .content li {{
            margin: 8px 0;
        }}
        .footer {{
            margin-top: 50px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
            text-align: center;
            color: #888;
            font-size: 14px;
        }}
        code {{
            background-color: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }}
        pre {{
            background-color: #f4f4f4;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }}
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>✍️ ContentPilot AI</h1>
            <p style="color: #666; margin: 10px 0 0 0;">Your AI-Generated Content is Ready!</p>
        </div>
        
        <div class="meta-info">
            <p><strong>📌 Topics:</strong> {', '.join(topics)}</p>
            <p><strong>📝 Content Types:</strong> {content_types}</p>
            <p><strong>📅 Generated:</strong> {datetime.now().strftime('%B %d, %Y at %I:%M %p')}</p>
        </div>
        
        <div class="content">
            {content_html}
        </div>
        
        <div class="footer">
            <p>Generated by <strong>ContentPilot AI</strong></p>
            <p style="margin-top: 10px; font-size: 12px;">
                This content was automatically generated using advanced AI agents.
            </p>
        </div>
    </div>
</body>
</html>
"""
        return html
    
    def _create_text_email(self, content: str, topics: list, content_types: str) -> str:
        """Create plain text version of email"""
        
        text = f"""
═══════════════════════════════════════════════
        CONTENTPILOT AI - GENERATED CONTENT
═══════════════════════════════════════════════

Topics: {', '.join(topics)}
Content Types: {content_types}
Generated: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}

───────────────────────────────────────────────

{content}

───────────────────────────────────────────────
Generated by ContentPilot AI
═══════════════════════════════════════════════
"""
        return text


# Create service instance
email_service = EmailService()
