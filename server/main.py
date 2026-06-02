from fastapi import FastAPI

from app.api.chat import router as chat_router
from app.api.geocode import router as geocode_router
from app.api.chart import router as chart_router
from app.api.transits import router as transits_router
from app.api.eval import router as eval_router

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

app.include_router(
    transits_router,
    prefix="/transits",
    tags=["Transits"]
)

app.include_router(
    eval_router,
    prefix="/eval",
    tags=["Eval"]
)