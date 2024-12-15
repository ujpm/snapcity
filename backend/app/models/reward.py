from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RewardBase(BaseModel):
    name: str
    description: str
    points_required: int
    image: Optional[str] = None
    category: str
    quantity_available: int

class RewardCreate(RewardBase):
    pass

class RewardUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    points_required: Optional[int] = None
    image: Optional[str] = None
    category: Optional[str] = None
    quantity_available: Optional[int] = None

class Reward(RewardBase):
    id: str
    created_at: datetime
    redeemed_count: int = 0

    class Config:
        from_attributes = True

class RewardRedemption(BaseModel):
    user_id: str
    reward_id: str
    redeemed_at: datetime
    status: str  # 'pending', 'completed', 'expired'
