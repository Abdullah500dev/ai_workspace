from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.upload import router as upload_router
from routes.query import router as query_router
from routes.delete import router as delete_router

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
