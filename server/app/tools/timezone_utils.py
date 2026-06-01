from timezonefinder import TimezoneFinder
from zoneinfo import ZoneInfo
from datetime import datetime

tf = TimezoneFinder()


def get_timezone_name(
    latitude: float,
    longitude: float,
):
    tz = tf.timezone_at(
        lat=latitude,
        lng=longitude,
    )

    return tz


def dec_to_dms(deg: float) -> str:
    """Convert decimal degrees to flatlib integer DMS string (e.g. 23.535 → '23:32:6')."""
    d = int(abs(deg))
    m = int((abs(deg) - d) * 60)
    s = round((abs(deg) - d - m / 60) * 3600)
    return f"{d}:{m}:{s}"


def get_timezone_offset(latitude: float, longitude: float) -> str:
    tz_name = get_timezone_name(latitude, longitude)
    if not tz_name:
        return "+00:00"

    offset = datetime.now(ZoneInfo(tz_name)).utcoffset()
    if offset is None:
        return "+00:00"

    total_seconds = int(offset.total_seconds())
    sign = "+" if total_seconds >= 0 else "-"
    hours = abs(total_seconds) // 3600
    minutes = (abs(total_seconds) % 3600) // 60
    return f"{sign}{hours:02d}:{minutes:02d}"
