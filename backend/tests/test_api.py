import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.repositories.contact_message_repository import get_contact_message_repository
from app.schemas.contact import ContactRequest


class FakeContactMessageRepository:
    def __init__(self) -> None:
        self.saved: list[ContactRequest] = []

    async def create(self, payload: ContactRequest) -> None:
        self.saved.append(payload)


fake_repository = FakeContactMessageRepository()
app.dependency_overrides[get_contact_message_repository] = lambda: fake_repository
client = TestClient(app)
API = "/api/v1"


def test_health_returns_ok() -> None:
    response = client.get(f"{API}/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_chat_returns_assistant_message() -> None:
    response = client.post(f"{API}/chat", json={"messages": [{"role": "user", "content": "Hi"}]})
    assert response.status_code == 200
    assert response.json()["message"]["role"] == "assistant"


def test_chat_rejects_empty_history() -> None:
    response = client.post(f"{API}/chat", json={"messages": []})
    assert response.status_code == 422


def test_agent_status_is_coming_soon() -> None:
    response = client.get(f"{API}/agent/status")
    assert response.json()["status"] == "coming_soon"


@pytest.mark.parametrize("website", ["", "spam.example"])
def test_contact_accepts_valid_submission(website: str) -> None:
    payload = {
        "name": "Ada Lovelace",
        "email": "ada@example.com",
        "subject": "Hello",
        "message": "I would love to collaborate on a project.",
        "website": website,
    }
    response = client.post(f"{API}/contact", json=payload)
    assert response.status_code == 202
    assert response.json()["success"] is True


def test_contact_persists_message_but_not_honeypot() -> None:
    fake_repository.saved.clear()
    payload = {"name": "Ada", "email": "ada@example.com", "message": "Long enough message."}
    client.post(f"{API}/contact", json=payload)
    client.post(f"{API}/contact", json={**payload, "website": "bot"})
    assert len(fake_repository.saved) == 1


def test_contact_rejects_invalid_email() -> None:
    payload = {"name": "Ada", "email": "not-an-email", "message": "Long enough message."}
    response = client.post(f"{API}/contact", json=payload)
    assert response.status_code == 422
