import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB connection string from environment variables
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/ai-workspace-chat")

# Create a MongoDB client
client = AsyncIOMotorClient(MONGODB_URI)

# Get the database
db = client.get_database()

# Get the messages collection
messages_collection = db.messages

# Test the connection
async def test_connection():
    try:
        await client.admin.command('ping')
        print("✅ MongoDB connection successful!")
        return True
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
        return False
