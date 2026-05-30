from langchain_core.tools import tool
from flatlib.chart import Chart
from flatlib.datetime import Datetime
from flatlib.geopos import GeoPos
from flatlib import const

from app.tools.timezone_utils import get_timezone_offset


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

    pos = GeoPos(str(latitude), str(longitude))

    chart = Chart(dt, pos)

    sun = chart.get(const.SUN)
    moon = chart.get(const.MOON)
    mercury = chart.get(const.MERCURY)
    venus = chart.get(const.VENUS)
    mars = chart.get(const.MARS)

    return {
        "sun": sun.sign,
        "moon": moon.sign,
        "mercury": mercury.sign,
        "venus": venus.sign,
        "mars": mars.sign,
    }
