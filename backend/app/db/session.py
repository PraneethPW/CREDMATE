from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import DATABASE_URL

# Neon-friendly engine configuration
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,     # avoids stale connections
    pool_size=5,            # keep small for serverless
    max_overflow=10
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()