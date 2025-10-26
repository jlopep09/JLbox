import React, { useState } from 'react'

function ItemsGridHeader({filter, setFilter, warehouses, refresh}) {

  return (
    <div className='flex flex-row justify-end w-full mb-4 gap-2'>
        <NewItemButton warehouses={warehouses} refresh={refresh}></NewItemButton>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn px-15">
            Filtros
          </div>
          
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 p-2 shadow">
            <li onClick={()=>{setFilter("asc")}}><p>{filter=="asc"&&(<span>o</span>)}Recientes primero</p></li>
            <li onClick={()=>{setFilter("desc")}}><p>{filter=="desc"&&(<span>o</span>)}Antiguos primero</p></li>
          </ul>
        </div>

    </div>
  )
}
function NewItemButton({warehouses, refresh}){
  let classesByWarehouses = (warehouses && warehouses.length>0)? "btn btn-secondary text-center p-4" :"btn btn-disabled text-center p-4"
  let tooltipText = (warehouses && warehouses.length>0)? "Create new item form":"Create a warehouse first"

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [count, setCount] = useState(1)
  const postData = async () => {
      const data = { name, description, count};
      const payload = {
        name: name,
        description: description,
        count: count,
        box_id: 1,
        owner_id: 1
      }
      
      try{
          const response = await fetch(`${import.meta.env.VITE_API_URL}/items/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error al crear el nuevo item:", errorData);
            return;
          }

          const data = await response.json();
          
          await refresh() //fetch items
      }catch(err){
        console.log("Error en la peticion:",err)
      }
      
      document.getElementById('new_item_modal')?.close(); // Cierra el modal
  };

  return (
    <>
      <div className="tooltip" data-tip={tooltipText}>
        <button className={classesByWarehouses} onClick={()=>document.getElementById('new_item_modal').showModal()}>New item</button>
      </div>
    
      <dialog id="new_item_modal" className="modal">
        <div className="modal-box align-middle justify-center flex flex-col items-center">
          <h3 className="font-bold text-lg mb-4">New Item Form</h3>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

            <label className="label">Name*</label>
            <input type="text" className="input validator" placeholder="Name" required maxLength={90} value={name} onChange={(e)=>setName(e.target.value)}/>

            <label className="label">Description</label>
            <textarea type="text" className="textarea " placeholder="Description" maxLength={250} value={description} onChange={(e) => setDescription(e.target.value)} />

            <label className="label">Units</label>
            <input type="number" className="input validator" placeholder="Type a number of units" maxLength={10} value={count} min="1" max="100000" onChange={(e) => setCount(e.target.value)} />
            

            <button className="btn btn-neutral mt-4" onClick={postData}>Create</button>
          </fieldset>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}

export default ItemsGridHeader