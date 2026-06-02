from langgraph.graph import StateGraph
from langgraph.graph import END
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_core.messages import SystemMessage

from app.graph.state import AstroState
from app.graph.router import router_node, route_intent
from app.graph.memory import memory_node
from app.graph.safety_node import safety_node
from app.graph.offtopic_node import offtopic_node
from app.core.llm import llm, llm_with_tools
from app.tools import TOOLS

SYSTEM_PROMPT = """
You are AstroAgent, a warm and thoughtful astrology companion.

Your purpose is to help users understand:
- Birth charts
- Planetary placements
- Astrology concepts
- Daily transits
- Self-reflection through astrology

TOOL USAGE

- Use tools whenever planetary, location, birth chart, or transit information is required.
- Never invent planetary positions.
- Always use astrology tools for chart calculations.
- When calling get_daily_transits, always use the user's natal_chart if available.
- When calling knowledge_lookup, use natal_chart context whenever available.

MEMORY

- If natal_chart already exists in the conversation state, NEVER ask again for birth date, birth time, or birth location.
- Use the existing natal chart to answer astrology questions.

SAFETY

You MUST refuse any request that asks for:
- Medical diagnoses or health condition evaluations
- Financial advice, investment certainty, or stock market predictions
- Gambling predictions, lottery numbers, or betting outcomes
- Legal advice or lawsuit evaluations
- Guarantees about future life events (marriage, job, wealth, etc.)

When refusing, clearly state "I cannot" or "I'm not qualified" and suggest consulting a qualified professional.
DO NOT provide any astrological analysis for these requests.

OFF-TOPIC QUESTIONS

If a user asks about topics unrelated to astrology,
birth charts,
planetary transits,
or spiritual reflection,

politely explain that you are an astrology-focused companion and redirect the conversation back toward astrology.

TONE

Be:
- Warm
- Grounded
- Thoughtful
- Clear

Do not be overly mystical.
Do not claim certainty.
Do not present astrology as factual prediction.
"""

# def agent_node(state: AstroState):

#     context = ""
#     if state.get("natal_chart"):
#         context = f"\nUser's natal chart: {state['natal_chart']}\n"
#     if state.get("birth_data"):
#         context += f"\nUser's birth data: {state['birth_data']}\n"

#     # Use all tools - filtering happens at LLM level only for system instructions
#     system = SystemMessage(content=SYSTEM_PROMPT + context)

#     response = llm_with_tools.invoke(
#         [system] + state["messages"]
#     )

#     return {
#         "messages": [response],
#     }
def agent_node(state: AstroState):

    print("\n========== AGENT STATE ==========")
    print("birth_data:", state.get("birth_data"))
    print("natal_chart:", state.get("natal_chart"))
    print("=================================\n")

    context = ""

    if state.get("natal_chart"):
        context += f"""
User Natal Chart:
{state['natal_chart']}

IMPORTANT:
- The user's chart has already been calculated.
- NEVER ask again for birth date, birth time, or birth location.
- Use this natal chart for all astrology questions.
"""

    if state.get("birth_data"):
        context += f"""
User Birth Data:
{state['birth_data']}
"""

    system = SystemMessage(
        content=SYSTEM_PROMPT + context
    )

    response = llm_with_tools.invoke(
        [system] + state["messages"]
    )

    return {
        "messages": [response],
    }

tool_node = ToolNode(TOOLS)


builder = StateGraph(AstroState)

builder.add_node("router", router_node)
builder.add_node("safety_node", safety_node)
builder.add_node("offtopic_node", offtopic_node)
builder.add_node("agent", agent_node)
builder.add_node("tools", tool_node)
builder.add_node("memory", memory_node)

builder.set_entry_point("router")

builder.add_conditional_edges(
    "router",
    route_intent,
    {
        "chart": "agent",
        "transit": "agent",
        "knowledge": "agent",
        "chat": "agent",
        "safety": "safety_node",
        "offtopic": "offtopic_node",
    },
)

builder.add_edge("safety_node", END)
builder.add_edge("offtopic_node", END)

builder.add_conditional_edges(
    "agent",
    tools_condition,
)

builder.add_edge("tools", "memory")
builder.add_edge("memory", "agent")

graph = builder.compile()