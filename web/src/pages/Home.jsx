import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col justify-center align-middle items-center min-h-full min-w-md sm:w-lg md:w-2xl lg:w-4xl xl:w-5xl'>
        <section className='grid grid-cols-3 w-full gap-2 p-8 shadow-sm'>
            <WarehouseCard></WarehouseCard>
            <WarehouseCard></WarehouseCard>
            <WarehouseCard></WarehouseCard>
            <WarehouseCard></WarehouseCard>
            <WarehouseCard></WarehouseCard>
            <WarehouseCard></WarehouseCard>
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

function WarehouseCard() {
  return (
    <div className='bg-neutral-200 min-h-20'>
        <div className='bg-neutral-300 h-8 flex flex-col w-full justify-center a'>
            <p className='text-center'>Warehouse</p>
        </div>

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