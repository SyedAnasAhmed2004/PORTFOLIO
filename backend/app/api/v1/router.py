from fastapi import APIRouter

from app.api.v1.endpoints import agent, chat, contact, health

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(chat.router)
api_router.include_router(agent.router)
api_router.include_router(contact.router)
