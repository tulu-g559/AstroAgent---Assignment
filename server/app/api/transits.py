from fastapi import APIRouter

from app.tools.transits import get_daily_transits

router = APIRouter()


@router.get("/")
def transits():
    return get_daily_transits.invoke(
        {
            "latitude": 22.5726,
            "longitude": 88.3639,
        }
    )
