from datetime import datetime
from typing import Optional

from langchain_core.tools import tool
from flatlib.chart import Chart
from flatlib.datetime import Datetime
from flatlib.geopos import GeoPos
from flatlib import const

PLANET_MAP = [
    ("sun", const.SUN),
    ("moon", const.MOON),
    ("mercury", const.MERCURY),
    ("venus", const.VENUS),
    ("mars", const.MARS),
    ("jupiter", const.JUPITER),
    ("saturn", const.SATURN),
]


@tool
def get_daily_transits(
    latitude: float,
    longitude: float,
    natal_chart: Optional[dict] = None,
):
    """Fetch current planetary transits and compare with natal chart."""
    now = datetime.utcnow()

    date = now.strftime("%Y/%m/%d")
    time = now.strftime("%H:%M")

    dt = Datetime(date, time, "+00:00")

    pos = GeoPos(str(latitude), str(longitude))

    chart = Chart(dt, pos)

    current_transits = {}
    for name, const_val in PLANET_MAP:
        planet = chart.get(const_val)
        current_transits[name] = planet.sign

    result = {
        "date": date,
        "current_transits": current_transits,
    }

    if natal_chart:
        matches = []
        for name in current_transits:
            transit_sign = current_transits[name]
            natal_sign = natal_chart.get(name)
            if natal_sign and transit_sign == natal_sign:
                matches.append(
                    f"{name.capitalize()} currently in {transit_sign}, matching your natal {name}"
                )

        result["matches"] = matches
        result["observation"] = (
            f"{len(matches)} transit-natal alignment{'s' if len(matches) != 1 else ''} found."
            if matches
            else "No direct sign alignments between current transits and natal chart."
        )

    return result
