"""Application settings loaded from environment variables (and `.env` locally)."""

from functools import lru_cache
from typing import Annotated, Literal

from pydantic import Field, SecretStr, field_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict
from sqlalchemy import URL, make_url


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        populate_by_name=True,
    )

    app_name: str = "Portfolio API"
    app_version: str = "0.1.0"
    environment: Literal["development", "staging", "production"] = "development"
    api_v1_prefix: str = "/api/v1"

    # Comma-separated list in the environment, e.g. "http://localhost:5173,https://me.vercel.app"
    cors_origins: Annotated[list[str], NoDecode] = Field(
        default_factory=lambda: ["http://localhost:5173"]
    )

    # PostgreSQL — either set the individual parts (local) or a full DATABASE_URL (hosted).
    db_host: str = "localhost"
    db_port: int = 5432
    db_user: str = "postgres"
    db_password: SecretStr | None = None
    db_name: str = "Portfolio"
    database_url_override: SecretStr | None = Field(default=None, alias="DATABASE_URL")
    db_echo: bool = False

    # Contact form delivery (Resend HTTP API — works on serverless, unlike SMTP)
    resend_api_key: SecretStr | None = None
    contact_from_email: str = "Portfolio <onboarding@resend.dev>"
    contact_to_email: str | None = None

    @field_validator("cors_origins", mode="before")
    @classmethod
    def _split_origins(cls, value: object) -> object:
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        return value

    @property
    def is_production(self) -> bool:
        return self.environment == "production"

    @property
    def database_url(self) -> URL:
        """Async SQLAlchemy URL; special characters in the password are escaped safely."""
        if self.database_url_override:
            url = make_url(self.database_url_override.get_secret_value())
            query = dict(url.query)
            # Hosted providers emit libpq's `sslmode`; asyncpg expects `ssl`.
            if "sslmode" in query:
                query["ssl"] = query.pop("sslmode")
            query.pop("channel_binding", None)
            return url.set(drivername="postgresql+asyncpg", query=query)

        return URL.create(
            drivername="postgresql+asyncpg",
            username=self.db_user,
            password=self.db_password.get_secret_value() if self.db_password else None,
            host=self.db_host,
            port=self.db_port,
            database=self.db_name,
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()
