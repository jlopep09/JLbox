import React, { useEffect, useState } from 'react'
import WarehouseCard from "./../components/home/WarehouseCard"
import ItemsGridHeader from "./../components/home/ItemsGridHeader"
import ItemCard from "./../components/home/ItemCard"


const Home = () => {
  const [warehouses, setWarehouses] = useState({})
  const [loadingWh, setLoadingWh] = useState(true)
  const get_wh_url = `${import.meta.env.VITE_API_URL}/wh/1`
  
  const get_items_url = `${import.meta.env.VITE_API_URL}/items/1`
  const [items, setItems] = useState([])
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(30)
  const [loadingItems, setLoadingItems] = useState(true)
  

  const fetchItems = async () => {
  setLoadingItems(true);
  try {
    const response = await fetch(`${get_items_url}?offset=${offset}&limit=${limit}`);
    const data = await response.json();

    if (data.items && Array.isArray(data.items)) {
      setItems((prevItems) => {
        // Crear un conjunto con los IDs que ya existen
        const existingIds = new Set(prevItems.map((item) => item[0]));

        // Filtrar solo los nuevos items que no estén ya
        const nuevos = data.items.filter((item) => !existingIds.has(item[0]));

        // Combinar
        return [...prevItems, ...nuevos];

      });
    }
  } catch (error) {
    console.error("Error al cargar los items:", error);
  } finally {
    
    setLoadingItems(false);
  }
};
  useEffect(() => {
      fetchItems();
    }, []);
  const fetchWarehouses = async () => {
    setLoadingWh(true);
    const response = await fetch(get_wh_url);
    const data = await response.json();
    setWarehouses(data);
    setLoadingWh(false);
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);
  if (loadingWh){
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
                return (<WarehouseCard key={`wh-${wh[0]}`} whName={wh[1]} whId={wh[0]} whOwner={1} whDescription={wh[2]} refresh = {fetchWarehouses}></WarehouseCard>)
              })
            }
            {warehouses["warehouses"].length<6&&(
              <WarehouseCard refresh={fetchWarehouses}></WarehouseCard>
            )}
            
            
            
        </section>

        
        <section className='flex flex-col w-full mt-8 pt-4 p-8 shadow-sm'>
            <ItemsGridHeader></ItemsGridHeader>
            <article className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 gap-2'>
                {items.map((item => {
                  return (<ItemCard key={`it-${item[0]}`} itemName = {item[1]}></ItemCard>)
                }))}
            </article>
            
        </section>
        
    </div>
    
  )
}








export default Home