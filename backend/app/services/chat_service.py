"""Chat service abstraction.

Endpoints depend on the `ChatService` protocol, so the placeholder below can be
swapped for the RAG pipeline later without touching the API layer.
"""

from typing import Protocol

from app.schemas.chat import ChatMessage, ChatResponse


class ChatService(Protocol):
    async def generate_reply(self, messages: list[ChatMessage]) -> ChatResponse: ...


class PlaceholderChatService:
    """Returns a friendly canned answer until the RAG pipeline is connected."""

    async def generate_reply(self, messages: list[ChatMessage]) -> ChatResponse:
        last_question = messages[-1].content
        reply = (
            "Thanks for asking! My knowledge base is still being indexed, so I can't "
            f'answer "{last_question[:120]}" with grounded detail yet. In the meantime, '
            "explore the home page or reach out through the contact page."
        )
        return ChatResponse(message=ChatMessage(role="assistant", content=reply))


def get_chat_service() -> ChatService:
    return PlaceholderChatService()
