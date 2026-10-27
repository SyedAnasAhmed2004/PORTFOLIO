"""Reserved for the conversational AI agent."""

from fastapi import APIRouter

from app.schemas.common import FeatureStatusResponse

router = APIRouter(prefix="/agent", tags=["agent"])


@router.get("/status", response_model=FeatureStatusResponse)
async def get_agent_status() -> FeatureStatusResponse:
    return FeatureStatusResponse(
        feature="conversational-agent",
        status="coming_soon",
        message="The conversational agent is under active development.",
    )
