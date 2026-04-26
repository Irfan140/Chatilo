from langchain_groq import ChatGroq
from app.core.config import settings

def get_model() -> ChatGroq:
    return ChatGroq(
        model=settings.MODEL_NAME,
        temperature=settings.TEMPERATURE,
        api_key=settings.GROQ_API_KEY,
    )
