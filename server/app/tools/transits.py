from datetime import datetime

from langchain_core.tools import tool
from flatlib.chart import Chart
from flatlib.datetime import Datetime
from flatlib.geopos import GeoPos
from flatlib import const


@tool
def get_daily_transits(
    latitude: float,
    longitude: float,
):
    """Fetch current planetary transits for a given location."""
    now = datetime.utcnow()

    date = now.strftime("%Y/%m/%d")
    time = now.strftime("%H:%M")

    dt = Datetime(date, time, "+00:00")

    pos = GeoPos(str(latitude), str(longitude))

    chart = Chart(dt, pos)

    sun = chart.get(const.SUN)
    moon = chart.get(const.MOON)
    jupiter = chart.get(const.JUPITER)
    saturn = chart.get(const.SATURN)

    return {
        "date": date,
        "transits": {
            "sun": sun.sign,
            "moon": moon.sign,
            "jupiter": jupiter.sign,
            "saturn": saturn.sign,
        },
    }
