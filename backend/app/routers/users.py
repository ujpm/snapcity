from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.models.user import UserCreate, User, UserUpdate
from app.core.security import create_access_token, get_password_hash, verify_password
from app.db.mongodb import get_database
from datetime import timedelta
from app.core.config import get_settings
from bson import ObjectId

router = APIRouter()
settings = get_settings()

@router.post("/register", response_model=User)
async def register_user(user: UserCreate, db=Depends(get_database)):
    # Check if user exists
    if await db.users.find_one({"email": user.email}):
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    # Create new user
    user_dict = user.dict()
    user_dict["hashed_password"] = get_password_hash(user.password)
    del user_dict["password"]
    user_dict["points"] = 0
    user_dict["completed_missions"] = []
    
    result = await db.users.insert_one(user_dict)
    user_dict["id"] = str(result.inserted_id)
    
    return User(**user_dict)

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db=Depends(get_database)):
    user = await db.users.find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user["_id"])}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=User)
async def update_user(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_user),
    db=Depends(get_database)
):
    update_data = user_update.dict(exclude_unset=True)
    if update_data:
        await db.users.update_one(
            {"_id": ObjectId(current_user.id)},
            {"$set": update_data}
        )
    return await db.users.find_one({"_id": ObjectId(current_user.id)})
