from fastapi import APIRouter

from app.models.schemas import BirthDetails
from app.tools.geocode import geocode_place
from app.tools.birth_chart import compute_birth_chart

router = APIRouter()


@router.post("/")
def generate_chart(data: BirthDetails):
    coords = geocode_place(data.place)

    chart = compute_birth_chart(
        data.date,
        data.time,
        coords["latitude"],
        coords["longitude"],
    )

    return chart
