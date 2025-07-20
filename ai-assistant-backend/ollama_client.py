import requests

def generate_answer(prompt: str):
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": "llama3", "prompt": prompt}
    )
    return response.json()["response"]
