import os
from functools import lru_cache
from app.core.settings import Settings


@lru_cache
def get_settings() -> Settings:
    return Settings()


def init_langsmith():
    """Initialize LangSmith environment variables."""
    settings = get_settings()
    
    if settings.LANGSMITH_TRACING:
        os.environ["LANGSMITH_API_KEY"] = settings.LANGSMITH_API_KEY
        os.environ["LANGSMITH_ENDPOINT"] = settings.LANGSMITH_ENDPOINT
        os.environ["LANGSMITH_PROJECT"] = settings.LANGSMITH_PROJECT
        os.environ["LANGSMITH_TRACING"] = "true"


# Initialize LangSmith immediately when config is loaded
init_langsmith()

settings = get_settings()