
"""Gmail client wrapper"""

import os
import base64
from pathlib import Path
from typing import List, Dict, Optional
from email.mime.text import MIMEText
from datetime import datetime, timedelta
from dotenv import load_dotenv

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Load .env from parent directory
env_path = Path(__file__).parent.parent.parent / '.env'
load_dotenv(env_path)

# Gmail API scopes
SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.modify'
]


class GmailClient:
    """
    Gmail API client for reading and sending emails.
    
    Handles OAuth authentication and provides high-level email operations.
    """
    
    def __init__(self):
        """Initialize Gmail client with OAuth"""
        # Look for credentials in project root (parent directory)
        project_root = Path(__file__).parent.parent
        self.credentials_file = project_root / 'credentials.json'
        self.token_file = project_root / 'token.json'
        self.service = None
        self._authenticate()
    
    def _authenticate(self):
        """Handle OAuth 2.0 authentication"""
        creds = None
        
        # Check for existing token
        if self.token_file.exists():
            creds = Credentials.from_authorized_user_file(str(self.token_file), SCOPES)
        
        # Refresh or get new credentials
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                if not self.credentials_file.exists():
                    raise FileNotFoundError(
                        f"{self.credentials_file} not found!\n"
                        "Please download OAuth credentials from Google Cloud Console."
                    )
                flow = InstalledAppFlow.from_client_secrets_file(
                    str(self.credentials_file), SCOPES
                )
                creds = flow.run_local_server(port=0)
            
            # Save credentials
            self.token_file.write_text(creds.to_json())
        
        self.service = build('gmail', 'v1', credentials=creds)
        print("✅ Gmail authenticated!")
    
    def get_recent_emails(self, max_results: int = 10) -> List[Dict]:
        """
        Fetch recent unread emails from inbox.
        
        Args:
            max_results: Maximum number of emails to fetch
            
        Returns:
            List of email dictionaries
        """
        try:
            # Query for unread emails in inbox
            results = self.service.users().messages().list(
                userId='me',
                labelIds=['INBOX', 'UNREAD'],
                maxResults=max_results
            ).execute()
            
            messages = results.get('messages', [])
            
            if not messages:
                print("📭 No unread emails found")
                return []
            
            emails = []
            for msg in messages:
                email_data = self._get_email_details(msg['id'])
                if email_data:
                    emails.append(email_data)
            
            print(f"📬 Found {len(emails)} unread emails")
            return emails
            
        except HttpError as error:
            print(f"❌ Error fetching emails: {error}")
            return []
    
    def _get_email_details(self, msg_id: str) -> Optional[Dict]:
        """Get detailed information about a specific email"""
        try:
            message = self.service.users().messages().get(
                userId='me',
                id=msg_id,
                format='full'
            ).execute()
            
            headers = message['payload']['headers']
            
            # Extract headers
            subject = next((h['value'] for h in headers if h['name'] == 'Subject'), 'No Subject')
            from_header = next((h['value'] for h in headers if h['name'] == 'From'), 'Unknown')
            date_str = next((h['value'] for h in headers if h['name'] == 'Date'), '')
            
            # Parse sender
            from_email = from_header
            from_name = from_header
            if '<' in from_header:
                from_name = from_header.split('<')[0].strip()
                from_email = from_header.split('<')[1].replace('>', '').strip()
            
            # Get body
            body = self._get_email_body(message['payload'])
            
            # Get labels
            labels = message.get('labelIds', [])
            
            return {
                "id": msg_id,
                "thread_id": message['threadId'],
                "from_email": from_email,
                "from_name": from_name,
                "subject": subject,
                "body": body[:1000],  # Limit body length
                "date": datetime.now(),  # Simplified, parse date_str for production
                "labels": labels
            }
            
        except HttpError as error:
            print(f"❌ Error getting email {msg_id}: {error}")
            return None
    
    def _get_email_body(self, payload: Dict) -> str:
        """Extract email body from payload"""
        if 'parts' in payload:
            # Multi-part email
            for part in payload['parts']:
                if part['mimeType'] == 'text/plain':
                    data = part['body'].get('data', '')
                    if data:
                        return base64.urlsafe_b64decode(data).decode('utf-8')
        else:
            # Simple email
            data = payload['body'].get('data', '')
            if data:
                return base64.urlsafe_b64decode(data).decode('utf-8')
        
        return "Could not extract email body"
    
    def send_email(self, to: str, subject: str, body: str) -> bool:
        """
        Send an email.
        
        Args:
            to: Recipient email
            subject: Email subject
            body: Email body
            
        Returns:
            True if sent successfully
        """
        try:
            message = MIMEText(body)
            message['to'] = to
            message['subject'] = subject
            
            raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
            
            self.service.users().messages().send(
                userId='me',
                body={'raw': raw}
            ).execute()
            
            print(f"✅ Email sent to {to}")
            return True
            
        except HttpError as error:
            print(f"❌ Error sending email: {error}")
            return False
    
    def mark_as_read(self, msg_id: str) -> bool:
        """Mark an email as read"""
        try:
            self.service.users().messages().modify(
                userId='me',
                id=msg_id,
                body={'removeLabelIds': ['UNREAD']}
            ).execute()
            return True
        except HttpError as error:
            print(f"❌ Error marking as read: {error}")
            return False


# Global instance
gmail_client = GmailClient()
