"""Async engine and session factory."""

from collections.abc import AsyncIterator
from functools import lru_cache

from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.pool import NullPool

from app.core.config import get_settings


@lru_cache
def get_engine() -> AsyncEngine:
    settings = get_settings()
    if settings.is_production:
        # Serverless instances are short-lived: don't hold pooled connections between calls.
        return create_async_engine(settings.database_url, poolclass=NullPool, echo=settings.db_echo)
    return create_async_engine(
        settings.database_url, pool_size=5, pool_pre_ping=True, echo=settings.db_echo
    )


@lru_cache
def get_session_factory() -> async_sessionmaker[AsyncSession]:
    return async_sessionmaker(get_engine(), expire_on_commit=False)


async def get_db_session() -> AsyncIterator[AsyncSession]:
    """FastAPI dependency: one session per request. Repositories commit their own units of work."""
    async with get_session_factory()() as session:
        yield session
