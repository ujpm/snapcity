from fastapi import APIRouter, Depends, HTTPException
from app.models.user import User
from app.core.security import get_current_user
from app.services.openai_service import get_ai_response
from typing import List

router = APIRouter()

@router.post("/message")
async def send_message(
    message: str,
    current_user: User = Depends(get_current_user)
):
    try:
        response = await get_ai_response(message, str(current_user.id))
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/suggestions")
async def get_suggestions(
    current_user: User = Depends(get_current_user)
):
    suggestions = [
        "How can I start a new mission?",
        "What rewards are available?",
        "How do I earn more points?",
        "Show me nearby missions",
        "Help me report an issue"
    ]
    return {"suggestions": suggestions}
