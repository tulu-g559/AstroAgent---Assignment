from fastapi import FastAPI

from app.api.chat import router as chat_router
from app.api.geocode import router as geocode_router
from app.api.chart import router as chart_router

app = FastAPI(
    title="AstroAgent"
)

app.include_router(
    chat_router,
    prefix="/chat",
    tags=["Chat"]
)

app.include_router(
    geocode_router,
    prefix="/geocode",
    tags=["Geocode"]
)

app.include_router(
    chart_router,
    prefix="/chart",
    tags=["Chart"]
)