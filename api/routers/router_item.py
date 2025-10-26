from fastapi import APIRouter, Depends, HTTPException,status
from api.db.db_conector import get_connection
router = APIRouter(prefix="/items", tags=["Items"])


@router.get("/{user_id}")
async def get_items(user_id: int, offset:int = 0, limit:int = 30, conn = Depends(get_connection)):
    try:
        cur = conn.cursor()
        cur.execute("SELECT id, name, description, count, box_id FROM items WHERE owner_id = %s LIMIT %s OFFSET %s", (user_id, limit, offset))
        result = cur.fetchall()
        return {"items": result}
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No se ha podido cargar los objetos solicitados.")
    finally:
        cur.close()
