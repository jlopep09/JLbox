from fastapi import APIRouter

router = APIRouter(prefix="/wh", tags=["Warehouses"])


@router.get("/all")
async def get_all_wh():
    return [{"username": "Rick"}, {"username": "Morty"}]
