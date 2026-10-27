"""Delivers contact form submissions by email through the Resend HTTP API."""

import logging
from html import escape

import httpx

from app.core.config import Settings
from app.schemas.contact import ContactRequest

logger = logging.getLogger(__name__)

RESEND_API_URL = "https://api.resend.com/emails"


class ContactDeliveryError(RuntimeError):
    """Raised when the email provider rejects or fails to receive the message."""


class ContactService:
    def __init__(self, settings: Settings) -> None:
        self._settings = settings

    @property
    def is_configured(self) -> bool:
        return bool(self._settings.resend_api_key and self._settings.contact_to_email)

    async def send(self, payload: ContactRequest) -> None:
        if not self.is_configured:
            # Local development without credentials: log instead of failing.
            logger.warning("Email not configured; message from %s logged only", payload.email)
            logger.info("Contact message: %s", payload.model_dump(exclude={"website"}))
            return

        body = {
            "from": self._settings.contact_from_email,
            "to": [self._settings.contact_to_email],
            "reply_to": payload.email,
            "subject": f"[Portfolio] {payload.subject or 'New message'} — {payload.name}",
            "html": self._render_html(payload),
        }
        api_key = self._settings.resend_api_key.get_secret_value()  # type: ignore[union-attr]
        headers = {"Authorization": f"Bearer {api_key}"}

        try:
            async with httpx.AsyncClient(timeout=10) as client:
                response = await client.post(RESEND_API_URL, json=body, headers=headers)
                response.raise_for_status()
        except httpx.HTTPError as exc:
            logger.exception("Failed to deliver contact message")
            raise ContactDeliveryError("Email provider request failed") from exc

    @staticmethod
    def _render_html(payload: ContactRequest) -> str:
        message = escape(payload.message).replace("\n", "<br>")
        return (
            f"<p><strong>From:</strong> {escape(payload.name)} &lt;{escape(payload.email)}&gt;</p>"
            f"<p><strong>Subject:</strong> {escape(payload.subject) or '—'}</p>"
            f"<p>{message}</p>"
        )
