import logging
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import SQLAlchemyError

from app.core.config import Settings, get_settings
from app.repositories.contact_message_repository import (
    ContactMessageRepository,
    get_contact_message_repository,
)
from app.schemas.contact import ContactRequest, ContactResponse
from app.services.contact_service import ContactDeliveryError, ContactService

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/contact", tags=["contact"])

SUCCESS_MESSAGE = "Thanks for reaching out — I'll get back to you soon."


def get_contact_service(settings: Annotated[Settings, Depends(get_settings)]) -> ContactService:
    return ContactService(settings)


@router.post("", response_model=ContactResponse, status_code=status.HTTP_202_ACCEPTED)
async def submit_contact_form(
    payload: ContactRequest,
    repository: Annotated[ContactMessageRepository, Depends(get_contact_message_repository)],
    contact_service: Annotated[ContactService, Depends(get_contact_service)],
) -> ContactResponse:
    if payload.website:
        # Honeypot triggered: pretend success so bots learn nothing.
        return ContactResponse(success=True, message=SUCCESS_MESSAGE)

    try:
        await repository.create(payload)
    except (SQLAlchemyError, OSError) as exc:
        logger.exception("Failed to store contact message")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Message could not be saved. Please try again later.",
        ) from exc

    # The message is already stored, so a failed email notification is not fatal.
    try:
        await contact_service.send(payload)
    except ContactDeliveryError:
        logger.warning("Contact message stored but email notification failed")

    return ContactResponse(success=True, message=SUCCESS_MESSAGE)
