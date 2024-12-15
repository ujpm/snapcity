from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.models.reward import Reward, RewardCreate, RewardRedemption
from app.models.user import User
from app.core.security import get_current_user
from app.db.mongodb import get_database
from bson import ObjectId
from datetime import datetime

router = APIRouter()

@router.get("/", response_model=List[Reward])
async def get_rewards(
    skip: int = 0,
    limit: int = 10,
    category: str = None,
    db=Depends(get_database)
):
    query = {}
    if category:
        query["category"] = category
    
    rewards = await db.rewards.find(query).skip(skip).limit(limit).to_list(length=limit)
    return rewards

@router.post("/", response_model=Reward)
async def create_reward(
    reward: RewardCreate,
    current_user: User = Depends(get_current_user),
    db=Depends(get_database)
):
    reward_dict = reward.dict()
    reward_dict["created_at"] = datetime.utcnow()
    reward_dict["redeemed_count"] = 0
    
    result = await db.rewards.insert_one(reward_dict)
    reward_dict["id"] = str(result.inserted_id)
    
    return Reward(**reward_dict)

@router.post("/{reward_id}/redeem")
async def redeem_reward(
    reward_id: str,
    current_user: User = Depends(get_current_user),
    db=Depends(get_database)
):
    reward = await db.rewards.find_one({"_id": ObjectId(reward_id)})
    if not reward:
        raise HTTPException(status_code=404, detail="Reward not found")
    
    if current_user.points < reward["points_required"]:
        raise HTTPException(status_code=400, detail="Insufficient points")
    
    if reward["quantity_available"] <= reward["redeemed_count"]:
        raise HTTPException(status_code=400, detail="Reward out of stock")
    
    # Create redemption record
    redemption = RewardRedemption(
        user_id=str(current_user.id),
        reward_id=reward_id,
        redeemed_at=datetime.utcnow(),
        status="pending"
    )
    
    await db.redemptions.insert_one(redemption.dict())
    
    # Update user points and reward count
    await db.users.update_one(
        {"_id": ObjectId(current_user.id)},
        {"$inc": {"points": -reward["points_required"]}}
    )
    
    await db.rewards.update_one(
        {"_id": ObjectId(reward_id)},
        {"$inc": {"redeemed_count": 1}}
    )
    
    return {"message": "Reward redeemed successfully"}

@router.get("/my-redemptions", response_model=List[RewardRedemption])
async def get_my_redemptions(
    current_user: User = Depends(get_current_user),
    db=Depends(get_database)
):
    redemptions = await db.redemptions.find(
        {"user_id": str(current_user.id)}
    ).to_list(length=100)
    return redemptions
