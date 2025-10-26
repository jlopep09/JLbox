from typing import Optional
from fastapi import APIRouter
from api.db.db_conector import get_connection
from fastapi import HTTPException, status, Depends
from pydantic import BaseModel
router = APIRouter(prefix="/wh", tags=["Warehouses"])


@router.get("/{owner_id}")
async def get_all_wh_from_user_id(owner_id: int, conn = Depends(get_connection)):
    cur = conn.cursor()
    cur.execute("SELECT id, name, description FROM warehouses WHERE owner_id = %s LIMIT 6",(owner_id,))
    resultados = cur.fetchall()
    cur.close() #conn se cierra en el finally del metodo db_conector.get_connection
    return {"warehouses": resultados}

class WarehouseCreate(BaseModel):
    name: str
    description: Optional[str] = None
    owner_id: int

@router.post("/")
async def create_wh_by_user_id(wh :WarehouseCreate, conn = Depends(get_connection)):
    try:
        cur = conn.cursor()
        cur.execute("SELECT COUNT(*) FROM warehouses WHERE owner_id = %s", (wh.owner_id,))
        wh_count = int(cur.fetchone()[0])
        if wh_count >= 6:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You cant create more than 6 warehouses.")
        cur.execute("INSERT INTO warehouses (name, description, owner_id) VALUES (%s, %s, %s)",(wh.name, wh.description, wh.owner_id))
        conn.commit()
        return HTTPException(status_code=status.HTTP_201_CREATED)
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error inseperado: {str(e)}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    finally:
        cur.close()

class WarehouseDelete(BaseModel):
    warehouse_id: int
    owner_id: int

@router.delete("/")
def delete_wh_by_id(wh: WarehouseDelete, conn = Depends(get_connection)):
    try:
        cur = conn.cursor()
        cur.execute("SELECT count(id) FROM warehouses WHERE id = %s AND owner_id = %s", (wh.warehouse_id, wh.owner_id))
        warehouse_count = int(cur.fetchone()[0])
        if warehouse_count != 1:
            if warehouse_count > 1:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error: multiples warehouses were found with this id. Contact with the admin to fix it.")
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error: You dont own a warehouse with this id.")
        cur.execute("DELETE FROM warehouses WHERE id = %s AND owner_id = %s", (wh.warehouse_id, wh.owner_id))
        conn.commit()
    
    except:
        yield
    finally:
        cur.close()
    
