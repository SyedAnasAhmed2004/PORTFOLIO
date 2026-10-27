from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db_session
from app.models.contact_message import ContactMessage
from app.schemas.contact import ContactRequest


class ContactMessageRepository:
    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def create(self, payload: ContactRequest) -> ContactMessage:
        record = ContactMessage(
            name=payload.name,
            email=str(payload.email),
            subject=payload.subject,
            message=payload.message,
        )
        self._session.add(record)
        await self._session.commit()
        return record


def get_contact_message_repository(
    session: Annotated[AsyncSession, Depends(get_db_session)],
) -> ContactMessageRepository:
    return ContactMessageRepository(session)
