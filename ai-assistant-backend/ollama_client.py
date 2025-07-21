import requests

def get_embedding(text: str) -> list[float]:
    try:
        response = requests.post(
            "http://localhost:11434/api/embeddings",
            json={
                "model": "nomic-embed-text",
                "prompt": text,
            },
            timeout=30
        )
        response.raise_for_status()
        data = response.json()
        
        # Check if the response has the expected structure
        if not isinstance(data, dict) or 'embedding' not in data:
            print(f"Unexpected response format: {data}")
            # Return a zero vector as fallback (you might want to handle this differently)
            return [0.0] * 384  # nomic-embed-text typically returns 384-dimensional vectors
            
        return data['embedding']
    except requests.exceptions.RequestException as e:
        print(f"Error getting embedding: {e}")
        # Return a zero vector as fallback (you might want to handle this differently)
        return [0.0] * 384
