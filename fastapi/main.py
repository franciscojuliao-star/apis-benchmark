from fastapi import FastAPI

from routers import projetos

app = FastAPI(title="API Projetos")

app.include_router(projetos.router)
