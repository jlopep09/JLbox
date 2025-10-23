from fastapi import APIRouter

router = APIRouter(prefix="/box")


@router.get("/all")
async def get_all_boxes():
    return [{"username": "Rick"}, {"username": "Morty"}]
