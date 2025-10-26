from typing import Optional
from fastapi import APIRouter, Depends, HTTPException,status
from pydantic import BaseModel
from api.db.db_conector import get_connection
router = APIRouter(prefix="/items", tags=["Items"])


@router.get("/{user_id}")
async def get_items(user_id: int, offset:int = 0, limit:int = 30, filter:str = "desc", conn = Depends(get_connection)):
    try:
        cur = conn.cursor()
        if filter == "asc":
            cur.execute("SELECT id, name, description, count, box_id FROM items WHERE owner_id = %s ORDER BY created_at LIMIT %s OFFSET %s", (user_id, limit, offset))
        else:
            cur.execute("SELECT id, name, description, count, box_id FROM items WHERE owner_id = %s ORDER BY created_at DESC LIMIT %s OFFSET %s", (user_id, limit, offset))
        result = cur.fetchall()
        return {"items": result}
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No se ha podido cargar los objetos solicitados.")
    finally:
        cur.close()

class CreateItem(BaseModel):
    name: str
    description: Optional[str] = None
    count: Optional[int] = 1
    owner_id: int 
    box_id: int

@router.post("/")
async def create_items(item:CreateItem, conn = Depends(get_connection)):
    try:
        cur = conn.cursor()
        cur.execute("INSERT INTO items(name, description, count, box_id, owner_id) VALUES (%s, %s, %s, %s, %s)", (item.name, item.description, item.count, item.box_id, item.owner_id))
        conn.commit()
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No se ha podido crear el nuevo item.")
    finally:
        cur.close()
