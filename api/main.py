from fastapi import FastAPI
from api.routers.router_warehouse import router as router_wh
from api.routers.router_box import router as router_box
from api.routers.router_item import router as router_item
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(router_wh)
app.include_router(router_box)
app.include_router(router_item)
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/status")
async def root():
    return {"message": "Status: Ok"}