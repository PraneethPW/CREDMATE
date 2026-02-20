from fastapi import FastAPI
from app.db.session import engine, Base
from app.models.user import User
from app.api.auth import router as auth_router
from app.api.users import router as user_router
from app.models.proof import Proof
from app.api.proofs import router as proof_router

# Create tables in Neon
Base.metadata.create_all(bind=engine)

app = FastAPI(title="CredMate API")

app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(proof_router, prefix="/proofs", tags=["Proofs"])

@app.get("/")
def root():
    return {"message": "CredMate Backend Running on Neon 🚀"}