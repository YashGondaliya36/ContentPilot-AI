$ErrorActionPreference = "Stop"

Write-Host "Cleaning up old virtual environment..."
if (Test-Path ..\.venv) {
    Remove-Item -Recurse -Force ..\.venv
}

Write-Host "Creating new virtual environment using system Python..."
# Try to find a valid python. We prioritize C:\Python314 if exists (as seen in logs), otherwise 'python'
$pyPath = "python"
if (Test-Path "C:\Python314\python.exe") {
    $pyPath = "C:\Python314\python.exe"
}

& $pyPath -m venv ..\.venv

if (-not (Test-Path ..\.venv\Scripts\python.exe)) {
    Write-Error "Failed to create virtual environment."
    exit 1
}

Write-Host "Installing dependencies..."
..\.venv\Scripts\python.exe -m pip install --upgrade pip
..\.venv\Scripts\python.exe -m pip install -r requirements.txt

Write-Host "Setup complete. You can now run the server."
