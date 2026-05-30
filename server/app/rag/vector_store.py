import os
from pathlib import Path

from dotenv import load_dotenv

from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

load_dotenv()

DATA_DIR = Path(__file__).resolve().parents[2] / "data"
FAISS_DIR = Path(__file__).resolve().parents[2] / "faiss_index"

embeddings = OpenAIEmbeddings(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url=os.getenv("OPENROUTER_BASE_URL"),
    model="text-embedding-3-small",
)


def build_vector_store():
    docs = []

    for txt_path in DATA_DIR.glob("*.txt"):
        content = txt_path.read_text(encoding="utf-8")
        doc = Document(
            page_content=content,
            metadata={"source": txt_path.name},
        )
        docs.append(doc)

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50,
    )

    split_docs = splitter.split_documents(docs)

    faiss_db = FAISS.from_documents(split_docs, embeddings)

    faiss_db.save_local(str(FAISS_DIR))

    return faiss_db


def load_vector_store():
    return FAISS.load_local(
        str(FAISS_DIR),
        embeddings,
        allow_dangerous_deserialization=True,
    )
