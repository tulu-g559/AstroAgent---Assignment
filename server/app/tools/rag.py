from langchain_core.tools import tool

from app.rag.vector_store import load_vector_store

db = load_vector_store()


@tool
def knowledge_lookup(query: str):
    """Look up astrology knowledge about signs, houses, careers, or relationships."""
    results = db.similarity_search(query, k=3)

    return "\n\n".join(doc.page_content for doc in results)
