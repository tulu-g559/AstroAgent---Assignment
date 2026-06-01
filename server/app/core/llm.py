import os

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

from app.tools import TOOLS

load_dotenv()

llm = ChatOpenAI(
    model=os.getenv("MODEL_NAME"),
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url=os.getenv("OPENROUTER_BASE_URL"),
    temperature=0.3,
    streaming=True,
    max_tokens=8192,
)

llm_with_tools = llm.bind_tools(TOOLS)
