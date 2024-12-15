from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class PostBase(BaseModel):
    content: str
    images: Optional[List[str]] = None

class PostCreate(PostBase):
    user_id: str

class PostUpdate(BaseModel):
    content: Optional[str] = None
    images: Optional[List[str]] = None

class Post(PostBase):
    id: str
    user_id: str
    created_at: datetime
    likes: List[str] = []
    comments: List[dict] = []

    class Config:
        from_attributes = True

class CommentBase(BaseModel):
    content: str
    post_id: str
    user_id: str

class Comment(CommentBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
