from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class MissionBase(BaseModel):
    title: str
    description: str
    points: int
    category: str
    requirements: List[str]
    steps: List[str]
    image: Optional[str] = None

class MissionCreate(MissionBase):
    pass

class MissionUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    points: Optional[int] = None
    category: Optional[str] = None
    requirements: Optional[List[str]] = None
    steps: Optional[List[str]] = None
    image: Optional[str] = None

class Mission(MissionBase):
    id: str
    created_at: datetime
    progress: int = 0
    participants: List[str] = []

    class Config:
        from_attributes = True
