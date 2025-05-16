from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
import subprocess
import json
import os

app = FastAPI()

# Allow Vite dev server to access this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # or "*" for all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
resumed_path = os.path.join(BASE_DIR, "node_modules", ".bin", "resumed")
RESUME_JSON = os.path.join(BASE_DIR, "resume.json")
RESUME_PDF = os.path.join(BASE_DIR, "resume.pdf")
RESUME_HTML = os.path.join(BASE_DIR, "resume.html")
PUBLIC_DIR = os.path.join(BASE_DIR, "../frontend/public")


@app.post("/export-pdf")
async def export_pdf(request: Request):
    try:
        data = await request.json()

        with open(RESUME_JSON, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

        subprocess.run(
            [resumed_path, "export", "--theme", "jsonresume-theme-even"],
            cwd=BASE_DIR,
            check=True,
        )

        return FileResponse(
            path=RESUME_PDF,
            filename="resume.pdf",
            media_type="application/pdf",
        )
    except Exception as e:
        print("Error exporting PDF:", e)
        return JSONResponse(status_code=500, content={"error": "PDF generation failed"})


@app.post("/make")
async def make_html(request: Request):
    try:
        data = await request.json()

        with open(RESUME_JSON, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
            print(data)

        subprocess.run(
            [resumed_path, "render", "--theme", "jsonresume-theme-even"],
            cwd=BASE_DIR,
            check=True,
        )

        # Copy resume.html to Vite's public folder
        if not os.path.exists(PUBLIC_DIR):
            os.makedirs(PUBLIC_DIR)

        with open(RESUME_HTML, "r", encoding="utf-8") as src:
            with open(os.path.join(PUBLIC_DIR, "resume.html"), "w", encoding="utf-8") as dest:
                dest.write(src.read())

        return {"message": "HTML rendered successfully"}
    except Exception as e:
        print("Error rendering HTML:", e)
        return JSONResponse(status_code=500, content={"error": "HTML rendering failed"})
