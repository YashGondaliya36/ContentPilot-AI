$ErrorActionPreference = "Stop"

Write-Host "1. Cleaning up old environments..."
if (Test-Path .venv) { Remove-Item -Recurse -Force .venv }
if (Test-Path venv) { Remove-Item -Recurse -Force venv }

Write-Host "2. Creating new virtual environment with Python 3.11..."
# Use the py launcher to specifically select Python 3.11
py -3.11 -m venv .venv

if (-not (Test-Path .venv\Scripts\python.exe)) {
    Write-Error "Failed to create .venv with Python 3.11"
    exit 1
}

Write-Host "3. Installing dependencies (this may take a minute)..."
.venv\Scripts\python.exe -m pip install --upgrade pip
.venv\Scripts\python.exe -m pip install -r backend\requirements.txt

Write-Host "4. Setup Complete!"
Write-Host "Starting Backend Server..."
.venv\Scripts\python.exe -m uvicorn app.main:app --app-dir backend --reload --port 8000
