from datetime import datetime, timezone, timedelta

from langchain_core.tools import tool
from timezonefinder import TimezoneFinder
from flatlib.chart import Chart
from flatlib.datetime import Datetime
from flatlib.geopos import GeoPos
from flatlib import const


tf = TimezoneFinder()


def get_timezone_offset(latitude: float, longitude: float) -> str:
    tz_name = tf.timezone_at(lat=latitude, lng=longitude)
    if not tz_name:
        return "+00:00"

    tz = datetime.now(timezone.utc).astimezone(
        timezone(timedelta(seconds=0))
    ).tzinfo

    from zoneinfo import ZoneInfo
    offset = datetime.now(ZoneInfo(tz_name)).utcoffset()
    if offset is None:
        return "+00:00"

    total_seconds = int(offset.total_seconds())
    sign = "+" if total_seconds >= 0 else "-"
    hours = abs(total_seconds) // 3600
    minutes = (abs(total_seconds) % 3600) // 60
    return f"{sign}{hours:02d}:{minutes:02d}"


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
