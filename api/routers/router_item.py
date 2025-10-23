from fastapi import APIRouter

router = APIRouter(prefix="/item", tags=["Items"])


@router.get("/all")
async def get_all_items():
    return [{"username": "Rick"}, {"username": "Morty"}]
