# API - Serverless Functions

This directory contains Vercel serverless functions that act as a secure backend proxy for the AI coding platform.

## Functions

### `/api/generate-code`

**Purpose**: Securely proxy requests to the DeepSeek API without exposing API credentials to the client.

**Method**: POST

**Request Body**:
```json
{
  "prompt": "Create a hello world function",
  "language": "javascript"
}
```

**Response** (Success):
```json
{
  "code": "function helloWorld() {\n  console.log('Hello, World!');\n}"
}
```

**Response** (Error with Fallback):
```json
{
  "error": "DeepSeek API not configured",
  "fallback": true
}
```

## Environment Variables

Configure these in your Vercel project settings or in a `.env` file at the root:

- `DEEPSEEK_API`: DeepSeek API endpoint URL
- `DEEPSEEK_KEY`: Your DeepSeek API key

## Security

- API credentials are stored server-side only
- Never exposed to the client browser
- Requests are validated before forwarding to DeepSeek
- Automatic fallback to simulated mode if API is not configured
