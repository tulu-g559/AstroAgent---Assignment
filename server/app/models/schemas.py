from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str
    session_id: str = ""


class ChatResponse(BaseModel):
    response: str
    session_id: str


class BirthDetails(BaseModel):
    date: str
    time: str
    place: str
    session_id: str | None = None