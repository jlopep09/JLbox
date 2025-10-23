from fastapi import FastAPI
from api.db.db_conector import conn,cur
from api.routers.router_warehouse import router as router_wh
from api.routers.router_box import router as router_box
from api.routers.router_item import router as router_item


app = FastAPI()
app.include_router(router_wh)
app.include_router(router_box)
app.include_router(router_item)

@app.get("/status")
async def root():
    return {"message": "Status: Ok"}