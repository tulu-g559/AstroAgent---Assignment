from fastapi import APIRouter, Query

from app.tools.transits import get_daily_transits

router = APIRouter()


@router.get("/")
def transits(
    latitude: float = Query(default=22.5726),
    longitude: float = Query(default=88.3639),
):
    return get_daily_transits.invoke(
        {
            "latitude": latitude,
            "longitude": longitude,
        }
    )
