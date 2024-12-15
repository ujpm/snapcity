from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import users, missions, social, rewards, chat, dashboard
from app.core.config import settings

app = FastAPI(
    title="SnapCity API",
    description="Backend API for SnapCity urban improvement platform",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(missions.router, prefix="/api/missions", tags=["missions"])
app.include_router(social.router, prefix="/api/social", tags=["social"])
app.include_router(rewards.router, prefix="/api/rewards", tags=["rewards"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])

@app.get("/")
async def root():
    return {"message": "Welcome to SnapCity API"}
