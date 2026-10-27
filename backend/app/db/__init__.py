from app.db.base import Base
from app.models import *  # noqa: F403 — register every model on Base.metadata for Alembic

__all__ = ["Base"]
