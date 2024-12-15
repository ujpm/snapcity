from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    profile_image: Optional[str] = None

class UserInDB(UserBase):
    id: str
    hashed_password: str
    points: int = 0
    completed_missions: List[str] = []
    created_at: datetime
    profile_image: Optional[str] = None

class User(UserBase):
    id: str
    points: int
    profile_image: Optional[str]
    completed_missions: List[str]

    class Config:
        from_attributes = True
