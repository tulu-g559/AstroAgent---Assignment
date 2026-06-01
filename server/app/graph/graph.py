from langgraph.graph import StateGraph
from langgraph.graph import END
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_core.messages import SystemMessage

from app.graph.state import AstroState
from app.graph.router import router_node, route_intent
from app.graph.memory import memory_node
from app.core.llm import llm, llm_with_tools
from app.tools import TOOLS

SYSTEM_PROMPT = """
You are AstroAgent.

Use tools whenever planetary,
location,
or birth chart information
is required.

Never invent planetary positions.

Always use tools for astrology calculations.

When calling get_daily_transits, always pass the user's
natal_chart if it is available in the context above.

When calling knowledge_lookup, always pass the user's
natal_chart if it is available — this lets the RAG
system personalize explanations to their placements.
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
        "offtopic": "agent",
    },
)

builder.add_conditional_edges(
    "agent",
    tools_condition,
)

builder.add_edge("tools", "memory")
builder.add_edge("memory", "agent")

graph = builder.compile()