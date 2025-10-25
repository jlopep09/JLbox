import React, { useEffect, useState } from 'react'

const Home = () => {
  const [warehouses, setWarehouses] = useState({})
  const [loading, setLoading] = useState(true)
  const apiGetUrl = "http://localhost:8000/wh/1"
  useEffect(()=>{
    fetch(apiGetUrl).then(
      (response) =>{
        if(!response.ok) throw new Error(`Error while fetching warehouses.`)
          return response.json()
      }).then((data) => {setWarehouses(data);setLoading(false);})


  }, [])
  if (loading){
    return(
      <div className='flex flex-row justify-center py-10'>
        <p>Fetching data...</p>
      </div>

    )
  }
  return (
    
    <div className='flex flex-col justify-center align-middle items-center min-h-full min-w-md sm:w-lg md:w-2xl lg:w-4xl xl:w-5xl'>
      
        <section className='grid grid-cols-3 w-full gap-2 p-8 shadow-sm'>
            {
              warehouses["warehouses"].map((wh) => {
                return (<WarehouseCard key={`wh-${wh[0]}`} whName={wh[1]}></WarehouseCard>)
              })
            }
            {warehouses["warehouses"].length<6&&(
              <WarehouseCard></WarehouseCard>
            )}
            
            
            
        </section>

        
        <section className='flex flex-col w-full mt-8 pt-4 p-8 shadow-sm'>
            <ItemsGridHeader></ItemsGridHeader>
            <article className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 gap-2'>
                <ItemCard></ItemCard>
                <ItemCard></ItemCard>
                <ItemCard></ItemCard>
                <ItemCard></ItemCard>
                <ItemCard></ItemCard>
                <ItemCard></ItemCard>
                <ItemCard></ItemCard>
            </article>
            
        </section>
        
    </div>
    
  )
}

function WarehouseCard({whName, whItems}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const postData = async () => {
      const data = { name, description };
      const payload = {
        name: name,
        description: description,
        owner_id: 1
      }
      console.log("Datos del formulario:", data);
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
          console.log("Warehouse creada:", data);
      }catch(err){
        console.log("Error en la peticion:",err)
      }
      
      document.getElementById('my_modal_2').close(); // Cierra el modal
  };

  return (
    <div className='bg-neutral-200 min-h-20 flex flex-col justify-between pb-1'>
        <div className='bg-neutral-300 h-8 flex flex-col w-full justify-center a'>
          <p className='text-center'>{whName? whName: "Warehouse"}</p>
            
        </div>
        <div className='flex flex-row w-full align-middle justify-center p-1'>
        {whItems&&(<p className='pb-4'>{whItems} items</p>)}
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

function ItemsGridHeader() {
  return (
    <div className='flex flex-row justify-end w-full mb-4'>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn px-15">
            Filtros
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 p-2 shadow">
            <li ><p>Recientes primero</p></li>
            <li><p>Antiguos primero</p></li>
          </ul>
        </div>

    </div>
  )
}

function ItemCard() {
  return (
    <div className='h-60'>
        <div className='bg-neutral-200 h-45 flex flex-col w-full justify-center a'>
        </div>
        <div className='bg-neutral-300 h-15 flex flex-col w-full justify-center a'>
            <p className='text-center'>Item</p>
        </div>
    </div>
  )
}


export default Home