from typing import TypedDict, List, Optional, Any
from typing_extensions import Annotated
from langchain_core.messages import BaseMessage
from langgraph.graph import add_messages


class AstroState(TypedDict):
    messages: Annotated[List[BaseMessage], add_messages]
    intent: Optional[str]
    blocked: bool
    birth_data: Optional[dict]
    natal_chart: Optional[dict[str, Any]]