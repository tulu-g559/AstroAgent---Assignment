from langgraph.graph import StateGraph
from langgraph.graph import END
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_core.messages import SystemMessage

from app.graph.state import AstroState
from app.core.llm import llm_with_tools
from app.tools import TOOLS

SYSTEM_PROMPT = """
You are AstroAgent.

Use tools whenever planetary,
location,
or birth chart information
is required.

Never invent planetary positions.

Always use tools for astrology calculations.
"""


def agent_node(state: AstroState):

    response = llm_with_tools.invoke(
        [
            SystemMessage(content=SYSTEM_PROMPT)
        ]
        + state["messages"]
    )

    return {
        "messages": [response]
    }


tool_node = ToolNode(TOOLS)


builder = StateGraph(AstroState)

builder.add_node("agent", agent_node)
builder.add_node("tools", tool_node)

builder.set_entry_point("agent")

builder.add_conditional_edges(
    "agent",
    tools_condition,
)

builder.add_edge("tools", "agent")

graph = builder.compile()