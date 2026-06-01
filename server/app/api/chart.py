from fastapi import APIRouter

from app.models.schemas import BirthDetails
from app.tools.geocode import geocode_place
from app.tools.birth_chart import compute_birth_chart
from app.graph.session_store import generate_session_id, get_session, update_session

router = APIRouter()


@router.post("/")
def generate_chart(data: BirthDetails):
    sid = data.session_id or generate_session_id()

    coords = geocode_place.invoke({"place": data.place})

    chart = compute_birth_chart.invoke({
        "date": data.date,
        "time": data.time,
        "latitude": coords["latitude"],
        "longitude": coords["longitude"],
    })

    chart["location"] = data.place
    chart["birthDate"] = data.date
    chart["birthTime"] = data.time
    chart["latitude"] = coords["latitude"]
    chart["longitude"] = coords["longitude"]

    session = get_session(sid)

    update_session(sid, {
        "messages": session.get("messages", []),
        "birth_data": {
            "date": data.date,
            "time": data.time,
            "place": data.place,
            "latitude": coords["latitude"],
            "longitude": coords["longitude"],
        },
        "natal_chart": chart,
    })

    chart["session_id"] = sid

    return chart
