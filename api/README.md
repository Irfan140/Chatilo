# Chat API - Express + Bun

Minimal, production-ready Express API that consumes the FastAPI AI service.

## Project Structure

```
src/
├── server.ts              # Server entry point
├── index.ts               # Express app setup
├── routes/
│   └── chat.ts            # Chat routes
├── controllers/
│   └── chatController.ts  # Request handlers
├── services/
│   └── chatService.ts     # Business logic
├── clients/
│   └── aiClient.ts        # FastAPI client
└── utils/
    └── http.ts            # HTTP helper
```

## Data Flow

```
Client Request
    ↓
POST /chat (with "message")
    ↓
chatController.handleChat (validates input)
    ↓
chatService.chatService (processes)
    ↓
aiClient.generate (calls FastAPI)
    ↓
FastAPI /api/generate
    ↓
LLM Response
    ↓
JSON Response ({"reply": string})
    ↓
Client
```

## Setup

### Prerequisites
- Bun runtime installed (https://bun.sh)
- FastAPI AI service running on http://localhost:8000

### Installation

```bash
cd api
bun install
```

### Configuration

Copy `.env.example` to `.env` and adjust if needed:
```env
PORT=3000
HOST=localhost
AI_SERVICE_URL=http://localhost:8000
```

## Running

### Development (with hot reload)
```bash
bun run dev
```

### Production
```bash
bun run start
```

Server starts on `http://localhost:3000`

## API Endpoints

### Health Check
```bash
GET /health
```
Response:
```json
{"status": "healthy"}
```

### Generate Chat Response
```bash
POST /chat
Content-Type: application/json

{
  "message": "Your question here"
}
```

Response (Success - 200):
```json
{
  "reply": "AI-generated response"
}
```

Response (Validation Error - 400):
```json
{
  "error": "Message is required and must be a non-empty string"
}
```

Response (Service Error - 503):
```json
{
  "error": "AI service unavailable"
}
```

Response (Timeout - 504):
```json
{
  "error": "Request timeout"
}
```

## Error Handling

| Status | Scenario |
|--------|----------|
| 400 | Invalid/missing message |
| 503 | AI service unavailable |
| 504 | Request timeout (30s) |
| 500 | Internal server error |

## Key Features

✅ Clean layered architecture (routes → controllers → services → clients)  
✅ Proper error handling with meaningful HTTP status codes  
✅ Timeout protection (30s default)  
✅ TypeScript with strict mode  
✅ Input validation  
✅ Minimal dependencies (Express only)  
✅ Bun runtime (no Node.js needed)  

## Testing

```bash
# Start API
bun run dev

# In another terminal, test the endpoint
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello, how are you?"}'
```

Expected response:
```json
{"reply":"I am functioning well. How can I assist you today?"}
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 3000 | Server port |
| HOST | localhost | Server host |
| AI_SERVICE_URL | http://localhost:8000 | FastAPI service URL |

## Deployment

### Docker
```bash
docker build -t chat-api .
docker run -p 3000:3000 -e AI_SERVICE_URL=http://host.docker.internal:8000 chat-api
```

### Railway/Render/Vercel
Set environment variables and deploy. Make sure `AI_SERVICE_URL` points to your deployed FastAPI service.
