import React, { useState } from 'react'

function WarehouseCard({whName, whItems, whId, whOwner, refresh, whDescription}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const postData = async () => {
      const data = { name, description };
      const payload = {
        name: name,
        description: description,
        owner_id: 1
      }
      
      try{
          const response = await fetch("http://localhost:8000/wh/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error al crear warehouse:", errorData);
            return;
          }

          const data = await response.json();
          
          await refresh() //fetch warehouses
      }catch(err){
        console.log("Error en la peticion:",err)
      }
      
      document.getElementById('my_modal_2')?.close(); // Cierra el modal
  };
  const deleteWarehouse = async() =>{
      const payload = {
        warehouse_id: whId,
        owner_id: whOwner
      }
      try{
          const response = await fetch("http://localhost:8000/wh/", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error: cant delete warehouse:", errorData);
            return;
          }

          const data = await response.json();
          
          await refresh() //fetch warehouses
      }catch(err){
        console.log("Error en la peticion:",err)
      }
      
  }

  return (
    <div className='bg-neutral-200 min-h-20 flex flex-col justify-between pb-1'>
        <div className='bg-neutral-300 h-8 flex flex-row w-full justify-between items-center text-center px-1'>
          {whName&&(<>
            <button className='btn btn-ghost p-0 h-6'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
          </button>
          
          <p className='text-center flex'>{whName? whName: "Warehouse"}</p>
          
          <button className='btn btn-ghost p-0 h-6' onClick={deleteWarehouse}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
          </button></>)}
            
        </div>
        <div className='flex flex-row w-full align-middle justify-center p-1'>
        {whItems&&(<p className='pb-4'>{whItems} items</p>)}
        {whDescription&&(<p className='pb-4'>{whDescription}</p>)}
        </div>
        {!whName&&(<div className='flex flex-row w-full align-middle justify-center p-1'>
          <button className="btn btn-secondary text-center p-4" onClick={()=>document.getElementById('my_modal_2').showModal()}>New warehouse</button>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box align-middle justify-center flex flex-col items-center">
              <h3 className="font-bold text-lg mb-4">New Warehouse Form</h3>
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

                <label className="label">Name*</label>
                <input type="text" className="input validator" placeholder="Name" required maxLength={90} value={name} onChange={(e)=>setName(e.target.value)}/>

                <label className="label">Description</label>
                <textarea type="text" className="textarea " placeholder="Description" maxLength={250} value={description} onChange={(e) => setDescription(e.target.value)} />
                <button className="btn btn-neutral mt-4" onClick={postData}>Create</button>
              </fieldset>
              <p className="py-4">Press ESC key or click outside to close</p>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>)}
    </div>
  )
}

export default WarehouseCard