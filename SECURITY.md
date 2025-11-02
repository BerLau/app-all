# Security Architecture

## API Key Protection

This application implements a secure backend proxy architecture to protect API credentials from being exposed to the client.

## Architecture Overview

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   Browser   │────────▶│  Backend Proxy   │────────▶│  DeepSeek API   │
│  (Client)   │         │ /api/generate-   │         │                 │
│             │         │      code        │         │                 │
└─────────────┘         └──────────────────┘         └─────────────────┘
                                 │
                                 │ reads
                                 ▼
                        ┌──────────────────┐
                        │  Environment     │
                        │  Variables       │
                        │  (Server-side)   │
                        └──────────────────┘
```

## Implementation Details

### Backend Proxy (Vercel Serverless Function)

**Location**: `/api/generate-code.ts`

The backend proxy:
- Receives requests from the client with only the prompt and language
- Reads API credentials from server-side environment variables
- Makes authenticated requests to DeepSeek API
- Returns only the generated code to the client
- Never exposes credentials to the browser

### Client-side Service

**Location**: `/web-platform/src/services/aiService.ts`

The client-side service:
- Calls the backend proxy at `/api/generate-code`
- Does NOT store or access API credentials
- Handles responses and fallback to simulated mode
- No sensitive data in client-side code

### Environment Variables

**Server-side only** (configured in Vercel or root `.env`):
- `DEEPSEEK_API`: DeepSeek API endpoint
- `DEEPSEEK_KEY`: DeepSeek API key

These variables are:
- ✅ Stored server-side only
- ✅ Never embedded in client bundles
- ✅ Never exposed in browser
- ✅ Not accessible via developer tools
- ✅ Not visible in network requests

## Deployment

### Vercel (Production)

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add:
   - `DEEPSEEK_API` = `https://api.deepseek.com/v1/chat/completions`
   - `DEEPSEEK_KEY` = `your_api_key_here`

### Local Development

1. Create `.env` in the project root:
   ```bash
   cp .env.example .env
   ```

2. Add your credentials:
   ```
   DEEPSEEK_API=https://api.deepseek.com/v1/chat/completions
   DEEPSEEK_KEY=your_api_key_here
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

## Security Benefits

1. **No Client Exposure**: API keys never leave the server
2. **No Bundle Embedding**: Credentials not in compiled JavaScript
3. **No Network Visibility**: Only non-sensitive data in requests
4. **Rate Limiting Ready**: Backend can implement rate limiting
5. **Request Validation**: Backend validates all requests
6. **Audit Trail**: Server logs all API usage

## Security Scan Results

✅ CodeQL Analysis: 0 vulnerabilities detected
✅ No hardcoded credentials
✅ No sensitive data exposure
✅ Secure environment variable handling
