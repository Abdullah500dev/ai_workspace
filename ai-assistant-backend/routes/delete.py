from fastapi import APIRouter, HTTPException
from typing import List
import os
import logging
from chroma_client import client

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/documents/debug/list")
async def list_all_documents():
    """Debug endpoint to list all documents in the collection"""
    try:
        collection = client.get_collection("memory")
        # Get all documents with their metadata
        results = collection.get(include=["metadatas", "documents"])
        
        # Format the results for better readability
        formatted_results = []
        for i, doc_id in enumerate(results["ids"]):
            formatted_results.append({
                "id": doc_id,
                "metadata": results["metadatas"][i],
                "content_preview": (results["documents"][i][:100] + "...") if results["documents"][i] else ""
            })
        
        return {
            "status": "success",
            "count": len(results["ids"]),
            "documents": formatted_results
        }
        
    except Exception as e:
        error_msg = f"Error listing documents: {str(e)}"
        logger.error(error_msg, exc_info=True)
        raise HTTPException(status_code=500, detail=error_msg)

@router.delete("/documents/{document_id}")
async def delete_document(document_id: str):
    """
    Delete a document by its ID.
    The document_id should be in the format: filename_docIndex
    """
    logger.info(f"Attempting to delete document with ID: {document_id}")
    
    try:
        # The document_id is already in the format we use as the ChromaDB ID
        doc_id = document_id
        
        # Get the collection
        collection = client.get_collection("memory")
        
        # First, list all documents for debugging
        all_docs = collection.get(include=["metadatas"])
        logger.info(f"All document IDs in collection: {all_docs['ids']}")
        
        # Try to get the document directly by ID first
        try:
            doc = collection.get(ids=[doc_id], include=["metadatas"])
            if not doc["ids"]:
                raise ValueError(f"Document {doc_id} not found in collection")
                
            # Extract filename from metadata for cleanup
            filename = doc["metadatas"][0].get("source", "").split('/')[-1]  # Get just the filename
            logger.info(f"Found document metadata - source: {filename}")
            
        except Exception as e:
            logger.error(f"Error fetching document {doc_id}: {str(e)}")
            raise HTTPException(status_code=404, detail=f"Document {doc_id} not found")
        
        # Delete the document
        logger.info(f"Deleting document with ID: {doc_id}")
        collection.delete(ids=[doc_id])
        
        # Check if this was the last part of the document
        if filename:
            remaining_docs = collection.get(where={"source": filename}, include=["metadatas"])
            if not remaining_docs["ids"]:
                # Delete the file if it exists
                file_path = os.path.join("uploads", filename)
                if os.path.exists(file_path):
                    logger.info(f"Removing file: {file_path}")
                    os.remove(file_path)
        
        success_msg = f"Successfully deleted document {doc_id}"
        logger.info(success_msg)
        return {"status": "success", "message": success_msg}
        
    except HTTPException as he:
        logger.error(f"HTTP Exception: {he.detail}")
        raise
    except Exception as e:
        error_msg = f"Unexpected error: {str(e)}"
        logger.error(error_msg, exc_info=True)
        raise HTTPException(status_code=500, detail=error_msg)
