import json


def memory_node(state):
    birth_data = state.get("birth_data")
    natal_chart = state.get("natal_chart")

    if not state["messages"]:
        return {"birth_data": birth_data, "natal_chart": natal_chart}

    for msg in reversed(state["messages"]):
        if msg.type == "ai" and msg.tool_calls:
            for tc in msg.tool_calls:
                if tc["name"] == "compute_birth_chart":
                    birth_data = {
                        "date": tc["args"].get("date", ""),
                        "time": tc["args"].get("time", ""),
                        "latitude": tc["args"].get("latitude", 0),
                        "longitude": tc["args"].get("longitude", 0),
                    }
            break

    for msg in reversed(state["messages"]):
        if msg.type == "tool":
            try:
                parsed = json.loads(msg.content) if isinstance(msg.content, str) else msg.content
                if isinstance(parsed, dict) and any(k in parsed for k in ("sun", "moon", "mars")):
                    natal_chart = parsed
            except (json.JSONDecodeError, TypeError):
                pass
            if natal_chart:
                break

    return {
        "birth_data": birth_data,
        "natal_chart": natal_chart,
    }
