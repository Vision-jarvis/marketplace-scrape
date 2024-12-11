#!/bin/bash
export FLASK_APP=src/api/scrape.py
export FLASK_ENV=development
python -m flask run