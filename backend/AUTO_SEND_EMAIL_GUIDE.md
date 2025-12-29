# 🎯 Auto-Send Email Feature - Usage Guide

## Overview

The `/api/v1/content/generate` endpoint now supports **automatic email sending** after content generation!

---

## 🔥 Key Features

✅ **Optional**: Backward compatible - works without email fields  
✅ **Automatic**: Generates content → Sends email in one request  
✅ **Flexible**: Custom or auto-generated email subject  
✅ **Validated**: Proper email validation and error handling  
✅ **Informative**: Returns email send status in response  

---

## 📝 Usage Examples

### Option 1: Generate Content Only (No Email)

**Use when**: You just want to generate content and handle distribution later

```json
POST /api/v1/content/generate

{
  "content_topics": ["AI Content Writing"],
  "business_goals": "Educate content creators",
  "target_audience": "Digital marketers",
  "timeline": "Weekly for one month",
  "content_types": "Blog posts, Social media posts",
  "brand_voice": "Professional"
}
```

**Response**:
```json
{
  "status": "success",
  "content": "## AI Content Writing Guide\n\n...",
  "generated_at": "2025-12-29T21:45:00",
  "topics": ["AI Content Writing"],
  "email_sent": null,
  "email_status": null
}
```

---

### Option 2: Generate + Auto-Send Email

**Use when**: You want to generate content and immediately send it to a client

```json
POST /api/v1/content/generate

{
  "content_topics": ["AI Content Writing"],
  "business_goals": "Educate content creators",
  "target_audience": "Digital marketers",
  "timeline": "Weekly for one month",
  "content_types": "Blog posts, Social media posts",
  "brand_voice": "Professional",
  "send_email": true,
  "recipient_email": "client@example.com"
}
```

**Response**:
```json
{
  "status": "success",
  "content": "## AI Content Writing Guide\n\n...",
  "generated_at": "2025-12-29T21:45:00",
  "topics": ["AI Content Writing"],
  "email_sent": true,
  "email_status": "Content successfully sent to client@example.com"
}
```

---

### Option 3: Generate + Auto-Send with Custom Subject

**Use when**: You want a specific email subject line

```json
POST /api/v1/content/generate

{
  "content_topics": ["Eco-Friendly Travel", "Sustainable Tourism"],
  "business_goals": "Increase bookings",
  "target_audience": "Eco-conscious travelers",
  "timeline": "Weekly",
  "content_types": "Blog posts",
  "brand_voice": "Friendly",
  "send_email": true,
  "recipient_email": "client@example.com",
  "email_subject": "Your Custom Travel Content - Week 1"
}
```

**Response**:
```json
{
  "status": "success",
  "content": "## Eco-Friendly Travel Guide\n\n...",
  "generated_at": "2025-12-29T21:45:00",
  "topics": ["Eco-Friendly Travel", "Sustainable Tourism"],
  "email_sent": true,
  "email_status": "Content successfully sent to client@example.com"
}
```

---

## 🔧 Request Fields

### Required Fields (Always)
- `content_topics`: List of topics (1-5)
- `business_goals`: Your objectives
- `target_audience`: Who it's for
- `timeline`: Publication schedule
- `content_types`: Content formats
- `brand_voice`: Tone and style

### Optional Fields (Email Feature)
| Field | Type | Required When | Description |
|-------|------|---------------|-------------|
| `send_email` | boolean | - | Set to `true` to enable auto-send |
| `recipient_email` | string | `send_email: true` | Email address to send to |
| `email_subject` | string | - | Custom subject (auto-generated if omitted) |

---

## 🎨 Email Subject Auto-Generation

If you don't provide `email_subject`, it's automatically generated:

**Examples**:
- 1 topic: `"Your AI-Generated Content: AI Content Writing"`
- 2 topics: `"Your AI-Generated Content: AI Writing, SEO Tips"`
- 3+ topics: `"Your AI-Generated Content: AI Writing, SEO Tips and 1 more"`

---

## ✅ Validation Rules

1. **Email Required**: If `send_email: true`, `recipient_email` must be provided
2. **Valid Email**: Must match email format (user@domain.com)
3. **All Other Fields**: Same validation as before

**Error Examples**:

```json
// Missing recipient_email when send_email is true
{
  "detail": "recipient_email is required when send_email is True"
}
```

```json
// Invalid email format
{
  "detail": "value is not a valid email address"
}
```

---

## 📊 Response Fields

### Standard Fields (Always Present)
- `status`: "success"
- `content`: Generated content (markdown)
- `generated_at`: ISO timestamp
- `topics`: List of processed topics

### Email Fields (When Auto-Send Used)
- `email_sent`: `true` if sent successfully, `false` if failed
- `email_status`: Descriptive message about email send result

---

## 🔗 Complete Python Example

```python
import requests

BASE_URL = "http://localhost:8000/api/v1"

# Generate content and send email in one request
response = requests.post(f"{BASE_URL}/content/generate", json={
    # Required content fields
    "content_topics": ["AI Marketing", "Content Automation"],
    "business_goals": "Generate leads and educate prospects",
    "target_audience": "Marketing managers and CMOs",
    "timeline": "Bi-weekly for 2 months",
    "content_types": "Blog posts, Email newsletters",
    "brand_voice": "Professional and insightful",
    "additional_notes": "Include case studies and statistics",
    
    # Optional email fields
    "send_email": True,
    "recipient_email": "marketing.lead@company.com",
    "email_subject": "Latest AI Marketing Insights - ContentPilot AI"
})

result = response.json()

print(f"Status: {result['status']}")
print(f"Content generated: {len(result['content'])} characters")
print(f"Topics covered: {', '.join(result['topics'])}")

if result.get('email_sent'):
    print(f"✅ Email status: {result['email_status']}")
else:
    print("No email sent")
```

---

## 🎯 Use Cases

### 1. **Content Agency Workflow**
Generate content for clients and automatically email them for review:
```python
send_email=True
recipient_email="client@agency.com"
email_subject="Your Weekly Content - Ready for Review"
```

### 2. **Internal Content Review**
Generate content and send to your team:
```python
send_email=True
recipient_email="content-team@yourcompany.com"
email_subject="New Blog Post Draft - Please Review"
```

### 3. **Automated Content Delivery**
Set up scheduled jobs that generate and deliver content:
```python
# Cron job or scheduler
generate_and_send_content(
    topics=get_weekly_topics(),
    recipient=subscriber_email,
    send_email=True
)
```

### 4. **Preview Before Sending**
Generate first, review, then use separate `/send-email` endpoint:
```python
# Step 1: Generate (no email)
content = generate_content(send_email=False)

# Step 2: Review content
if looks_good(content):
    # Step 3: Send separately
    send_email(content, recipient)
```

---

## 🐛 Error Handling

```python
try:
    response = requests.post(f"{BASE_URL}/content/generate", json={
        ...
        "send_email": True,
        "recipient_email": "client@example.com"
    })
    response.raise_for_status()
    
    result = response.json()
    
    if result.get('email_sent'):
        print("✅ Content generated and emailed successfully!")
    else:
        print(f"⚠️ Content generated but email failed: {result.get('email_status')}")
        
except requests.exceptions.HTTPError as e:
    print(f"❌ API Error: {e.response.json()}")
except Exception as e:
    print(f"❌ Error: {str(e)}")
```

---

## 💡 Best Practices

1. **Use Auto-Send for Direct Delivery**
   - Client deliverables
   - Team notifications
   - Automated workflows

2. **Skip Email for Internal Review**
   - Draft content
   - Quality checks
   - A/B testing variations

3. **Custom Subjects for Organization**
   - Include dates: "Weekly Content - Dec 29, 2025"
   - Include project names: "[Project X] Blog Post"
   - Include status: "DRAFT: AI Content for Review"

4. **Handle Email Failures Gracefully**
   - Always check `email_sent` field
   - Log `email_status` for debugging
   - Have fallback: use `/send-email` endpoint

---

## 🎉 Summary

**Before**: Two steps required
1. Generate content → `POST /content/generate`
2. Send email → `POST /content/send-email`

**Now**: One step (optional)
1. Generate + Auto-send → `POST /content/generate` with `send_email: true`

**Both methods still work!** Use whichever fits your workflow better.

---

Need help? Check out:
- **API Docs**: http://localhost:8000/docs
- **Email Setup**: `EMAIL_SETUP.md`
- **Backend Setup**: `SETUP.md`
