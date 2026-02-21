from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.api.deps import get_current_user
from app.models.reputation import Reputation

router = APIRouter()


@router.get("/me")
def get_my_reputation(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    reputation = db.query(Reputation).filter(
        Reputation.user_id == current_user.id
    ).first()

    if not reputation:
        return {"score": 0}

    return {"score": reputation.score}