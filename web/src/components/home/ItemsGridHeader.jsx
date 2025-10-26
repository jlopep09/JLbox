import React from 'react'

function ItemsGridHeader({filter, setFilter}) {
  return (
    <div className='flex flex-row justify-end w-full mb-4 gap-2'>
        <button className='btn'>New item</button>
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

export default ItemsGridHeader