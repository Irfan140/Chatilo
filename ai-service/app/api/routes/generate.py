from fastapi import APIRouter

from app.schemas.generate import GenerateRequest, GenerateResponse
from app.services.chat_service import chat_service


router = APIRouter(prefix="/api",)


@router.post("/generate", response_model=GenerateResponse)
async def generate(request: GenerateRequest) -> GenerateResponse:
    # Call service layer
    response_text = await chat_service(request.prompt)
    
    return GenerateResponse(response=response_text)