from typing import Optional

from langchain_core.tools import tool

from app.rag.vector_store import load_vector_store

db = load_vector_store()


@tool
def knowledge_lookup(query: str, natal_chart: Optional[dict] = None):
    """
    Look up astrology knowledge about signs, houses, careers, or relationships.

    If the user's natal_chart is available, pass it so results can be personalized
    to the user's specific placements (e.g. moon sign, sun sign, rising sign).
    """
    context = query
    if natal_chart:
        parts = []
        for key in ("sun", "moon", "ascendant"):
            entry = natal_chart.get(key)
            if entry and isinstance(entry, dict):
                sign = entry.get("sign", "")
                parts.append(f"{key} in {sign}")
        if parts:
            context = f"{query} (user has {'; '.join(parts)})"

    results = db.similarity_search(context, k=3)

    return "\n\n".join(doc.page_content for doc in results)
