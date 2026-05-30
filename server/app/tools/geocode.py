from geopy.geocoders import Nominatim

geolocator = Nominatim(
    user_agent="astroagent"
)


def geocode_place(place: str):
    location = geolocator.geocode(place)

    if not location:
        raise ValueError(
            f"Could not find location: {place}"
        )

    return {
        "latitude": location.latitude,
        "longitude": location.longitude,
    }
