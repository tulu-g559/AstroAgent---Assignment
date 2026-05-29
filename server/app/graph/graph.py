from langgraph.graph import StateGraph
from langgraph.graph import END

from app.graph.state import AstroState
from app.core.llm import llm


def agent_node(state: AstroState):

    response = llm.invoke(state["messages"])

    return {
        "messages": state["messages"] + [response]
    }

builder = StateGraph(AstroState)

builder.add_node("agent", agent_node)

builder.set_entry_point("agent")

builder.add_edge("agent", END)

graph = builder.compile()