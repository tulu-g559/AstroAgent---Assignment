from langchain_core.tools import tool
from geopy.geocoders import Nominatim

geolocator = Nominatim(
    user_agent="astroagent"
)


@tool
def geocode_place(place: str):
    """Convert a city/place name into latitude and longitude."""
    location = geolocator.geocode(place)

    if not location:
        raise ValueError(
            f"Could not find location: {place}"
        )

    return {
        "latitude": location.latitude,
        "longitude": location.longitude,
    }
