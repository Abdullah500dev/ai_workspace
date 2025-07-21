import logging
import os
from typing import Dict, List

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

# Absolute imports
from embedding import generate_embeddings
from chroma_client import add_to_chroma
from google_docs_utils import process_google_doc

router = APIRouter()
logger = logging.getLogger(__name__)

class GoogleDocsRequest(BaseModel):
    url: str

@router.post("/api/google-docs/import")
async def import_google_doc(request: GoogleDocsRequest):
    """
    Import a Google Doc by URL, extract its content, and store it with embeddings.
    """
    try:
        # Process the Google Doc
        doc_data = process_google_doc(request.url)
        
        # Generate embeddings for the document content
        # Split the content into chunks if needed (you might want to implement chunking logic here)
        content_chunks = [doc_data['content']]  # Simple approach - consider implementing chunking
        embeddings = generate_embeddings(content_chunks)
        
        # Store in ChromaDB
        for i, (chunk, embedding) in enumerate(zip(content_chunks, embeddings)):
            doc_id = f"google_doc_{doc_data['title'].replace(' ', '_')}_{i}"
            add_to_chroma(
                doc_id=doc_id,
                content=chunk,
                metadata={
                    "source": "google_docs",
                    "title": doc_data['title'],
                    "url": request.url,
                    "chunk_index": i
                },
                embedding=embedding
            )
        
        return {
            "status": "success",
            "title": doc_data['title'],
            "chunks_imported": len(content_chunks)
        }
        
    except Exception as e:
        logger.error(f"Error importing Google Doc: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={"error": f"Failed to import Google Doc: {str(e)}"}
        )

@router.get("/api/google-docs/list")
async def list_imported_docs():
    """
    List all imported Google Docs with their metadata.
    """
    try:
        from chroma_client import collection
        
        # Query for all documents with source=google_docs
        results = collection.get(
            where={"source": "google_docs"},
            include=["metadatas"]
        )
        
        # Group by document URL to avoid duplicates
        docs = {}
        for i, metadata in enumerate(results.get('metadatas', [])):
            url = metadata.get('url', '')
            if url not in docs:
                docs[url] = {
                    'title': metadata.get('title', 'Untitled'),
                    'url': url,
                    'chunks': 0
                }
            docs[url]['chunks'] += 1
        
        return {
            "status": "success",
            "documents": list(docs.values())
        }
        
    except Exception as e:
        logger.error(f"Error listing Google Docs: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={"error": f"Failed to list Google Docs: {str(e)}"}
        )
