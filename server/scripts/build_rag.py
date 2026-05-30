import sys
from pathlib import Path

# Add server directory to Python path
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.rag.vector_store import build_vector_store

build_vector_store()
print("FAISS index built successfully.")
