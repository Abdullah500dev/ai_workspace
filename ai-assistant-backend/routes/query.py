from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from chroma_client import query_chroma
from embedding import generate_embeddings

router = APIRouter()

@router.get("/search")
async def search_documents(query: str, top_k: int = 5):
    """
    Search for documents similar to the query
    """
    try:
        # Generate embedding for the query
        query_embedding = generate_embeddings([query])[0]
        
        # Query ChromaDB
        results = query_chroma(query_embedding, top_k=top_k)
        
        # Format results
        formatted_results = []
        if results and 'documents' in results:
            for i in range(len(results['documents'][0])):
                doc = {
                    'content': results['documents'][0][i],
                    'metadata': results['metadatas'][0][i] if results.get('metadatas') else {},
                    'distance': results['distances'][0][i] if results.get('distances') else None
                }
                formatted_results.append(doc)
        
        return {"query": query, "results": formatted_results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/documents")
async def list_documents(limit: int = 10, offset: int = 0):
    """
    List all stored documents with pagination
    """
    try:
        from chroma_client import collection
        
        # Get all documents with pagination
        results = collection.get(
            limit=limit,
            offset=offset,
            include=["documents", "metadatas"]
        )
        
        return {
            "total": len(results['ids']) if results and 'ids' in results else 0,
            "documents": [
                {"id": doc_id, "content": doc, "metadata": meta}
                for doc_id, doc, meta in zip(
                    results.get('ids', []),
                    results.get('documents', []),
                    results.get('metadatas', [])
                )
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
