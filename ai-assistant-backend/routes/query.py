from fastapi import APIRouter, File, UploadFile
from file_parser import parse_pdf
from embedding import embed_text
from chroma_client import add_to_chroma

router = APIRouter()

@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    content = parse_pdf(file.file)
    embedding = embed_text(content)
    add_to_chroma(file.filename, content, {"source": file.filename}, embedding)
    return {"message": "File embedded and stored"}
