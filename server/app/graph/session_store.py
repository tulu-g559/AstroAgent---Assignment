import uuid
from typing import Any


_session_store: dict[str, dict[str, Any]] = {}


def _new_session() -> dict[str, Any]:
    return {
        "messages": [],
        "birth_data": None,
        "natal_chart": None,
    }


def generate_session_id() -> str:
    return uuid.uuid4().hex[:12]


def get_session(session_id: str) -> dict[str, Any]:
    if session_id not in _session_store:
        _session_store[session_id] = _new_session()
    return _session_store[session_id]


def update_session(session_id: str, state: dict[str, Any]) -> None:
    _session_store[session_id] = {
        "messages": state.get("messages", []),
        "birth_data": state.get("birth_data"),
        "natal_chart": state.get("natal_chart"),
    }


def set_session_data(
    session_id: str,
    birth_data: dict[str, Any] | None,
    natal_chart: dict[str, Any] | None,
) -> None:
    if session_id not in _session_store:
        _session_store[session_id] = _new_session()
    _session_store[session_id]["birth_data"] = birth_data
    _session_store[session_id]["natal_chart"] = natal_chart
