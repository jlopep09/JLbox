from fastapi import APIRouter

router = APIRouter(prefix="/item")


@router.get("/all")
async def get_all_items():
    return [{"username": "Rick"}, {"username": "Morty"}]
