from fastapi import APIRouter

from app.graph.session_store import generate_session_id, set_session_data

router = APIRouter()

EVAL_BIRTH_DATA = {
    "date": "2005/08/27",
    "time": "02:33",
    "latitude": 23.52,
    "longitude": 87.32,
}

EVAL_NATAL_CHART = {
    "sun": {"sign": "Aquarius", "degree": 5.8, "house": 2},
    "moon": {"sign": "Taurus", "degree": 12.5, "house": 6},
    "ascendant": {"sign": "Sagittarius", "degree": 8.8, "house": 1},
    "venus": {"sign": "Pisces", "degree": 21.2, "house": 4},
    "mars": {"sign": "Aries", "degree": 29.6, "house": 5},
    "mercury": {"sign": "Aquarius", "degree": 19.0, "house": 2},
}


@router.post("/init")
async def init_eval_session():
    sid = generate_session_id()
    set_session_data(sid, EVAL_BIRTH_DATA, EVAL_NATAL_CHART)
    return {"session_id": sid}
