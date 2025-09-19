import uvicorn
from ml_model import app

if __name__ == "__main__":
    # Host '0.0.0.0' allows connections from any IP
    uvicorn.run(app, host="0.0.0.0", port=8000)