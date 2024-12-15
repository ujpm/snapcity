from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # Database settings
    MONGODB_URL: str
    DATABASE_NAME: str

    # JWT settings
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # OpenAI settings
    OPENAI_API_KEY: str

    # AWS settings
    AWS_ACCESS_KEY_ID: str
    AWS_SECRET_ACCESS_KEY: str
    AWS_BUCKET_NAME: str
    AWS_REGION: str

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()
