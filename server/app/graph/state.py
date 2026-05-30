from typing import TypedDict, List, Optional, Any
from langchain_core.messages import BaseMessage


class AstroState(TypedDict):
    messages: List[BaseMessage]
    intent: Optional[str]
    blocked: bool
    birth_data: Optional[dict]
    natal_chart: Optional[dict[str, Any]]