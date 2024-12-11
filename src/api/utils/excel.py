import pandas as pd
from pathlib import Path

def save_to_excel(data: dict, filename: str) -> str:
    """Save data to Excel file and return the file path"""
    output_dir = Path('output')
    output_dir.mkdir(exist_ok=True)
    
    file_path = output_dir / filename
    df = pd.DataFrame(data)
    df.to_excel(file_path, index=False)
    return str(file_path)