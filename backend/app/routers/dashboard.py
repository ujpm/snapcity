from fastapi import APIRouter, Depends, HTTPException
from app.models.user import User
from app.core.security import get_current_user
from app.db.mongodb import get_database
from typing import List, Dict
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/stats")
async def get_dashboard_stats(
    current_user: User = Depends(get_current_user),
    db=Depends(get_database)
):
    # Get user's completed missions count
    completed_missions = len(current_user.completed_missions)
    
    # Get total points
    total_points = current_user.points
    
    # Get active missions
    active_missions = await db.missions.count_documents({
        "participants": str(current_user.id),
        "completed": False
    })
    
    # Get rewards redeemed
    rewards_redeemed = await db.redemptions.count_documents({
        "user_id": str(current_user.id)
    })
    
    return {
        "completed_missions": completed_missions,
        "total_points": total_points,
        "active_missions": active_missions,
        "rewards_redeemed": rewards_redeemed
    }

@router.get("/activity")
async def get_activity_history(
    current_user: User = Depends(get_current_user),
    db=Depends(get_database)
):
    # Get last 7 days of activity
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    
    # Get missions completed per day
    missions = await db.missions.find({
        "participants": str(current_user.id),
        "completed_at": {"$gte": seven_days_ago}
    }).to_list(length=None)
    
    # Get points earned per day
    points_history = await db.point_transactions.find({
        "user_id": str(current_user.id),
        "created_at": {"$gte": seven_days_ago}
    }).to_list(length=None)
    
    return {
        "missions": missions,
        "points_history": points_history
    }

@router.get("/leaderboard")
async def get_leaderboard(
    db=Depends(get_database)
):
    # Get top 10 users by points
    top_users = await db.users.find().sort("points", -1).limit(10).to_list(length=10)
    
    return {
        "leaderboard": [
            {
                "username": user["username"],
                "points": user["points"],
                "rank": idx + 1
            }
            for idx, user in enumerate(top_users)
        ]
    }

@router.get("/impact")
async def get_community_impact(
    db=Depends(get_database)
):
    # Get total community statistics
    total_missions = await db.missions.count_documents({})
    total_users = await db.users.count_documents({})
    total_points = await db.users.aggregate([
        {"$group": {"_id": None, "total": {"$sum": "$points"}}}
    ]).to_list(length=1)
    
    return {
        "total_missions_completed": total_missions,
        "active_users": total_users,
        "total_community_points": total_points[0]["total"] if total_points else 0
    }
