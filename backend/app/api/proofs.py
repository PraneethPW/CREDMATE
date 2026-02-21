from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
import hashlib

from app.db.session import get_db
from app.models.proof import Proof
from app.models.user import User
from app.api.deps import get_current_user
from app.services.reputation_service import update_reputation

router = APIRouter()


# ✅ Upload Proof
@router.post("/upload")
def upload_proof(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Read file content
    content = file.file.read()

    # Generate SHA256 hash
    file_hash = hashlib.sha256(content).hexdigest()

    # Check duplicate for same user
    existing_proof = db.query(Proof).filter(
        Proof.file_hash == file_hash,
        Proof.user_id == current_user.id
    ).first()

    if existing_proof:
        raise HTTPException(
            status_code=400,
            detail="This proof has already been uploaded."
        )

    # Create proof record
    new_proof = Proof(
        file_name=file.filename,
        file_hash=file_hash,
        user_id=current_user.id,
        created_at=datetime.utcnow()
    )

    db.add(new_proof)
    db.commit()
    db.refresh(new_proof)

    # 🔥 Automatically update reputation
    update_reputation(db, current_user.id)

    return {
        "message": "Proof uploaded successfully",
        "proof_id": new_proof.id,
        "file_name": new_proof.file_name,
        "file_hash": new_proof.file_hash
    }


# ✅ Get My Proofs
@router.get("/my")
def get_my_proofs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    proofs = db.query(Proof).filter(
        Proof.user_id == current_user.id
    ).order_by(Proof.created_at.desc()).all()

    return proofs