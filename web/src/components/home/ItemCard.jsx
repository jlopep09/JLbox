import React from 'react'

const ItemCard = ({itemName}) => {
  return (
    <div className='h-60'>
        <div className='bg-neutral-200 h-45 flex flex-col w-full justify-center a'>
        </div>
        <div className='bg-neutral-300 h-15 flex flex-col w-full justify-center a'>
            <p className='text-center'>{itemName}</p>
        </div>
    </div>
  )
}

export default ItemCard