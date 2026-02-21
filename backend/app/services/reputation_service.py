from sqlalchemy.orm import Session
from app.models.proof import Proof
from app.models.reputation import Reputation


def update_reputation(db: Session, user_id: int):
    # Count proofs
    total_proofs = db.query(Proof).filter(
        Proof.user_id == user_id
    ).count()

    # Simple scoring formula
    score = total_proofs * 10

    reputation = db.query(Reputation).filter(
        Reputation.user_id == user_id
    ).first()

    if reputation:
        reputation.score = score
    else:
        reputation = Reputation(
            user_id=user_id,
            score=score
        )
        db.add(reputation)

    db.commit()
    return score