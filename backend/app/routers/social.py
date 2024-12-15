from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from typing import List
from app.models.social import Post, PostCreate, Comment
from app.models.user import User
from app.core.security import get_current_user
from app.db.mongodb import get_database
from app.services.storage import upload_image
from bson import ObjectId
from datetime import datetime

router = APIRouter()

@router.get("/posts", response_model=List[Post])
async def get_posts(
    skip: int = 0,
    limit: int = 10,
    db=Depends(get_database)
):
    posts = await db.posts.find().sort("created_at", -1).skip(skip).limit(limit).to_list(length=limit)
    return posts

@router.post("/posts", response_model=Post)
async def create_post(
    post: PostCreate,
    current_user: User = Depends(get_current_user),
    db=Depends(get_database)
):
    post_dict = post.dict()
    post_dict["user_id"] = str(current_user.id)
    post_dict["created_at"] = datetime.utcnow()
    post_dict["likes"] = []
    post_dict["comments"] = []
    
    result = await db.posts.insert_one(post_dict)
    post_dict["id"] = str(result.inserted_id)
    
    return Post(**post_dict)

@router.post("/posts/upload-image")
async def upload_post_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    image_url = await upload_image(file, "posts")
    return {"image_url": image_url}

@router.post("/posts/{post_id}/like")
async def like_post(
    post_id: str,
    current_user: User = Depends(get_current_user),
    db=Depends(get_database)
):
    post = await db.posts.find_one({"_id": ObjectId(post_id)})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    user_id = str(current_user.id)
    if user_id in post["likes"]:
        await db.posts.update_one(
            {"_id": ObjectId(post_id)},
            {"$pull": {"likes": user_id}}
        )
        return {"message": "Post unliked"}
    else:
        await db.posts.update_one(
            {"_id": ObjectId(post_id)},
            {"$push": {"likes": user_id}}
        )
        return {"message": "Post liked"}

@router.post("/posts/{post_id}/comments", response_model=Comment)
async def add_comment(
    post_id: str,
    comment: str,
    current_user: User = Depends(get_current_user),
    db=Depends(get_database)
):
    comment_dict = {
        "id": str(ObjectId()),
        "content": comment,
        "user_id": str(current_user.id),
        "created_at": datetime.utcnow()
    }
    
    await db.posts.update_one(
        {"_id": ObjectId(post_id)},
        {"$push": {"comments": comment_dict}}
    )
    
    return Comment(**comment_dict)
