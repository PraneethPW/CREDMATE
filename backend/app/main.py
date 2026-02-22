import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.users import router as user_router
from app.api.proofs import router as proof_router
from app.api.reputation import router as reputation_router

app = FastAPI(title="CredMate API")

# -------------------------------
# CORS Configuration
# -------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://credmatedeployment.vercel.app",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# Include Routers
# -------------------------------
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(proof_router, prefix="/proofs", tags=["Proofs"])
app.include_router(reputation_router, prefix="/reputation", tags=["Reputation"])


@app.get("/")
def root():
    return {"message": "CredMate Backend Running 🚀"}


# -------------------------------
# Railway / Production Entry Point
# -------------------------------
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 8000)),
    )