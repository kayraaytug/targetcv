from fastapi import FastAPI, Request, Response, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
import subprocess
import json
import os
import tempfile
import shutil
import uuid

app = FastAPI()

# Allow Vite dev server to access this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
RESUMED_CMD = os.path.join(BASE_DIR, "node_modules", ".bin", "resumed.cmd")

@app.post("/export-pdf")
async def export_pdf(request: Request, background_tasks: BackgroundTasks):
    try:
        data = await request.json()

        # Create a unique working directory for this request
        temp_dir = tempfile.mkdtemp(prefix="resume_")
        temp_json = os.path.join(temp_dir, "resume.json")
        temp_pdf = os.path.join(temp_dir, "resume.pdf")

        # Save user-provided resume data
        with open(temp_json, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

        # Copy necessary files to temp dir if needed
        # Here we just need resume.json — resumed will generate other output

        # Run the resumed CLI to generate PDF
        subprocess.run(
            [RESUMED_CMD, "export", "--theme", "jsonresume-theme-even"],
            cwd=temp_dir,
            check=True
        )

        # Cleanup after response is sent
        def cleanup():
            shutil.rmtree(temp_dir, ignore_errors=True)

        background_tasks.add_task(cleanup)

        return FileResponse(
            path=os.path.join(temp_dir, "resume.pdf"),
            filename="resume.pdf",
            media_type="application/pdf",
        )

    except subprocess.CalledProcessError as e:
        return JSONResponse(status_code=500, content={"error": f"resumed failed: {e}"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": f"PDF generation failed: {e}"})


@app.post("/make")
async def make_html(request: Request, background_tasks: BackgroundTasks):
    try:
        data = await request.json()

        # Create a unique temp directory
        temp_dir = tempfile.mkdtemp(prefix="resume_")
        temp_json = os.path.join(temp_dir, "resume.json")
        temp_html = os.path.join(temp_dir, "resume.html")

        # Write JSON to the temp dir
        with open(temp_json, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

        # Generate HTML using resumed
        subprocess.run(
            [RESUMED_CMD, "render", "--theme", "jsonresume-theme-even"],
            cwd=temp_dir,
            check=True
        )

        # Read HTML content
        with open(temp_html, "r", encoding="utf-8") as f:
            html_content = f.read()

        # Cleanup
        def cleanup():
            shutil.rmtree(temp_dir, ignore_errors=True)

        background_tasks.add_task(cleanup)

        return Response(content=html_content, media_type="text/html")

    except subprocess.CalledProcessError as e:
        return JSONResponse(status_code=500, content={"error": f"resumed failed: {e}"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": f"HTML rendering failed: {e}"})
