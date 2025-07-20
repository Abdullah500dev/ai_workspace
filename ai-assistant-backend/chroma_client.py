import chromadb
from chromadb.config import Settings

client = chromadb.Client(Settings(chroma_db_impl="duckdb+parquet", persist_directory="./chroma"))
collection = client.get_or_create_collection("memory")

def add_to_chroma(doc_id, content, metadata, embedding):
    collection.add(documents=[content], ids=[doc_id], embeddings=[embedding], metadatas=[metadata])

def query_chroma(query_embedding, top_k=5):
    return collection.query(query_embeddings=[query_embedding], n_results=top_k)
