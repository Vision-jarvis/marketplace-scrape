from flask import Flask
from flask_cors import CORS
from pathlib import Path
import os

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

class Config:
    DEBUG = True
    PORT = int(os.environ.get('PORT', 5000))
    HOST = os.environ.get('HOST', 'localhost')
    OUTPUT_DIR = Path('output')
    
    # Ensure output directory exists
    OUTPUT_DIR.mkdir(exist_ok=True)

app.config.from_object(Config)