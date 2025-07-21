from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.upload import router as upload_router
from routes.query import router as query_router
from routes.delete import router as delete_router
from routes import google_docs
from routes.chat import init_chat_routes
from mongodb import client as mongodb_client, test_connection
import asyncio

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(upload_router, prefix="")  # Handles /upload
app.include_router(query_router, prefix="/api")  # Handles /api/search and /api/documents
app.include_router(delete_router, prefix="/api")  # Handles /api/documents/{document_id}
app.include_router(google_docs.router, prefix="")  # Handles /api/google-docs/import and /api/google-docs/list

# Initialize chat routes with MongoDB
init_chat_routes(app, mongodb_client.get_database())

# Test MongoDB connection on startup
@app.on_event("startup")
async def startup_db_client():
    connected = await test_connection()
    if not connected:
        raise Exception("Failed to connect to MongoDB")
