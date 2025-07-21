import chromadb
from chromadb.config import Settings
import os

# Ensure the chroma directory exists
os.makedirs("./chroma", exist_ok=True)

# Initialize the client with persistent storage
client = chromadb.PersistentClient(path="./chroma")

# Get or create the collection
collection = client.get_or_create_collection(
    name="memory",
    metadata={"hnsw:space": "cosine"}  # Using cosine distance for semantic search
)

def add_to_chroma(doc_id: str, content: str, metadata: dict, embedding: list[float]):
    """
    Add a document to the Chroma collection.
    
    Args:
        doc_id: Unique identifier for the document
        content: Text content of the document
        metadata: Dictionary of metadata
        embedding: Vector embedding of the document
    """
    try:
        collection.upsert(
            ids=[doc_id],
            documents=[content],
            embeddings=[embedding],
            metadatas=[metadata]
        )
    except Exception as e:
        print(f"Error adding to Chroma: {e}")
        raise

def query_chroma(query_embedding: list[float], top_k: int = 5):
    """
    Query the Chroma collection for similar documents.
    
    Args:
        query_embedding: The embedding vector to search with
        top_k: Number of results to return
        
    Returns:
        List of matching documents with their scores
    """
    try:
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
            include=["documents", "metadatas", "distances"]
        )
        return results
    except Exception as e:
        print(f"Error querying Chroma: {e}")
        raise
