from fastapi import APIRouter

from app.tools.geocode import geocode_place

router = APIRouter()


@router.get("/")
def geocode(place: str):
    return geocode_place(place)
