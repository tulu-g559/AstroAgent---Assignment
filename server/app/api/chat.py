import json

from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from langchain_core.messages import HumanMessage

from app.graph.graph import graph
from app.graph.session_store import generate_session_id, get_session, update_session
from app.models.schemas import ChatRequest
from app.models.schemas import ChatResponse

router = APIRouter()

TOOL_STATUS_MAP = {
    "geocode_place": "📍 Resolving birthplace...",
    "compute_birth_chart": "🌙 Calculating natal chart...",
    "knowledge_lookup": "✨ Retrieving astrology insights...",
    "get_daily_transits": "☀️ Calculating current transits...",
}


def _build_input_state(session_id: str, message: str) -> dict:
    session = get_session(session_id)
    return {
        "messages": list(session.get("messages", [])) + [HumanMessage(content=message)],
        "birth_data": session.get("birth_data"),
        "natal_chart": session.get("natal_chart"),
    }


async def stream_response(message: str, session_id: str):
    # Emit session_id so the frontend can persist it
    yield f"data: __session__:{session_id}\n\n"

    input_state = _build_input_state(session_id, message)

    prev_msg_count = len(input_state.get("messages", []))
    final_state = None
    final_content = None

    async for event in graph.astream(input_state, stream_mode="values"):
        final_state = event
        msgs = event.get("messages", [])
        for msg in msgs[prev_msg_count:]:
            if hasattr(msg, "tool_calls") and msg.tool_calls:
                for tc in msg.tool_calls:
                    name = tc.get("name", "")
                    status = TOOL_STATUS_MAP.get(
                        name,
                        f"🔮 Processing {name}...",
                    )
                    yield f"data: {status}\n\n"
            elif msg.content:
                final_content = msg.content
        prev_msg_count = len(msgs)

    if final_state:
        update_session(session_id, final_state)

    if final_content:
        for char in final_content:
            yield f"data: {char}\n\n"

    yield "data: [DONE]\n\n"


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    sid = request.session_id or generate_session_id()
    input_state = _build_input_state(sid, request.message)

    result = graph.invoke(input_state)

    update_session(sid, result)

    final_message = result["messages"][-1]

    return ChatResponse(
        response=final_message.content,
        session_id=sid,
    )


@router.post("/stream")
async def stream_chat(request: ChatRequest):
    sid = request.session_id or generate_session_id()
    return StreamingResponse(
        stream_response(request.message, sid),
        media_type="text/event-stream",
    )
