from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str


class BirthDetails(BaseModel):
    date: str
    time: str
    place: str