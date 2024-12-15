from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.models.mission import Mission, MissionCreate, MissionUpdate
from app.models.user import User
from app.core.security import get_current_user
from app.db.mongodb import get_database
from bson import ObjectId
from datetime import datetime

router = APIRouter()

@router.get("/", response_model=List[Mission])
async def get_missions(
    skip: int = 0,
    limit: int = 10,
    category: str = None,
    db=Depends(get_database)
):
    query = {}
    if category:
        query["category"] = category
    
    missions = await db.missions.find(query).skip(skip).limit(limit).to_list(length=limit)
    return missions

@router.post("/", response_model=Mission)
async def create_mission(
    mission: MissionCreate,
    current_user: User = Depends(get_current_user),
    db=Depends(get_database)
):
    mission_dict = mission.dict()
    mission_dict["created_at"] = datetime.utcnow()
    mission_dict["participants"] = []
    
    result = await db.missions.insert_one(mission_dict)
    mission_dict["id"] = str(result.inserted_id)
    
    return Mission(**mission_dict)

@router.get("/{mission_id}", response_model=Mission)
async def get_mission(mission_id: str, db=Depends(get_database)):
    mission = await db.missions.find_one({"_id": ObjectId(mission_id)})
    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")
    return mission

@router.post("/{mission_id}/join")
async def join_mission(
    mission_id: str,
    current_user: User = Depends(get_current_user),
    db=Depends(get_database)
):
    mission = await db.missions.find_one({"_id": ObjectId(mission_id)})
    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")
    
    if str(current_user.id) not in mission["participants"]:
        await db.missions.update_one(
            {"_id": ObjectId(mission_id)},
            {"$push": {"participants": str(current_user.id)}}
        )
    
    return {"message": "Successfully joined mission"}

@router.post("/{mission_id}/complete")
async def complete_mission(
    mission_id: str,
    current_user: User = Depends(get_current_user),
    db=Depends(get_database)
):
    mission = await db.missions.find_one({"_id": ObjectId(mission_id)})
    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")
    
    # Update user points and completed missions
    await db.users.update_one(
        {"_id": ObjectId(current_user.id)},
        {
            "$inc": {"points": mission["points"]},
            "$push": {"completed_missions": mission_id}
        }
    )
    
    return {"message": "Mission completed successfully", "points_earned": mission["points"]}
