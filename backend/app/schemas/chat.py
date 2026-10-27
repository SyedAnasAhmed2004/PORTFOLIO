"""Request/response models for the portfolio chatbot."""

from typing import Literal

from pydantic import BaseModel, Field

ChatRole = Literal["user", "assistant"]


class ChatMessage(BaseModel):
    role: ChatRole
    content: str = Field(min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(min_length=1, max_length=50)


class SourceReference(BaseModel):
    """A document chunk the answer was grounded on (populated once RAG is wired in)."""

    title: str
    url: str | None = None
    snippet: str | None = None


class ChatResponse(BaseModel):
    message: ChatMessage
    sources: list[SourceReference] = Field(default_factory=list)
