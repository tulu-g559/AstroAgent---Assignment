from fastapi import APIRouter

from langchain_core.messages import HumanMessage

from app.graph.graph import graph
from app.models.schemas import ChatRequest
from app.models.schemas import ChatResponse

router = APIRouter()


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):

    result = graph.invoke(
        {
            "messages": [
                HumanMessage(content=request.message)
            ]
        }
    )

    final_message = result["messages"][-1]

    return ChatResponse(
        response=final_message.content
    )