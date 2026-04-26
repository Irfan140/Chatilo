from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ---- App ----
    APP_NAME: str = "AI Service"
    ENV: str = "development"

    # ---- LLM ----
    GROQ_API_KEY: str

    # ---- Optional model config ----
    MODEL_NAME: str
    TEMPERATURE: float = 0.5

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
    )