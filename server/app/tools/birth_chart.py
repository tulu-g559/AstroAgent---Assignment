from langchain_core.tools import tool
from flatlib.chart import Chart
from flatlib.datetime import Datetime
from flatlib.geopos import GeoPos
from flatlib import const

from app.tools.timezone_utils import get_timezone_offset, dec_to_dms


@tool
def compute_birth_chart(
    date: str,
    time: str,
    latitude: float,
    longitude: float,
):
    """Compute the birth chart for a given date, time, and location."""
    offset_str = get_timezone_offset(latitude, longitude)

    dt = Datetime(date, time, offset_str)

    lat_dms = dec_to_dms(latitude)
    lon_dms = dec_to_dms(longitude)
    pos = GeoPos(lat_dms, lon_dms)

    chart = Chart(dt, pos)

    sun = chart.get(const.SUN)
    moon = chart.get(const.MOON)
    mercury = chart.get(const.MERCURY)
    venus = chart.get(const.VENUS)
    mars = chart.get(const.MARS)
    ascendant = chart.get(const.ASC)

    def planet_obj(obj):
        house_obj = chart.houses.getObjectHouse(obj)
        return {
            "sign": obj.sign,
            "degree": round(obj.signlon, 1),
            "house": int(house_obj.id.replace("House", "")) if house_obj else None,
        }

    return {
        "sun": planet_obj(sun),
        "moon": planet_obj(moon),
        "mercury": planet_obj(mercury),
        "venus": planet_obj(venus),
        "mars": planet_obj(mars),
        "ascendant": planet_obj(ascendant),
    }
