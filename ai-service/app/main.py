"""FastAPI application entry point."""
from fastapi import FastAPI
from fastapi.responses import JSONResponse

from app.api.routes.generate import router as generate_router


# Initialize FastAPI app
app = FastAPI(
    title="Chat API",
    description="FastAPI AI service",
    version="1.0.0",
)


# Include routers
app.include_router(generate_router)


@app.get("/health")
async def health_check() -> JSONResponse:
    """Health check endpoint."""
    return JSONResponse({"status": "healthy"})


@app.get("/")
async def root() -> JSONResponse:
    """Root endpoint."""
    return JSONResponse({"message": "Chat API is running"})


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
