from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.session import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    # 🔥 One-to-Many: User → Proofs
    proofs = relationship("Proof", back_populates="user")

    # 🔥 One-to-One: User → Reputation
    reputation = relationship("Reputation", uselist=False)