from typing import TypedDict, List
from langchain_core.messages import BaseMessage


class AstroState(TypedDict):
    messages: List[BaseMessage]