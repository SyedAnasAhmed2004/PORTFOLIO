"""Schemas shared by multiple endpoints."""

from typing import Literal

from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: Literal["ok"] = "ok"
    version: str
    environment: str


class FeatureStatusResponse(BaseModel):
    feature: str
    status: Literal["available", "coming_soon"]
    message: str
