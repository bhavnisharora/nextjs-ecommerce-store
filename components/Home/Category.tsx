import { getAllCategory } from '@/request/Request'
import React from 'react'

const Category = async() => {
    const categories: string[] = await getAllCategory();
    console.log(categories, "categories");
  return (
    <div className='pt-16 pb-12'>
        <h1 className='font-bold text-center capitalize text-2xl'>
            Shop by category
        </h1>

    <div className='w-4/5 mt-12 mx-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
    
    {categories.map((category)=>{
return <div key={category} className='p-6 rounded-lg cursor-pointer text-center hover:scale-110 transition-all duration-300 bg-gray-200 shadow-md'>
    <h1 className='text-sm sm:text-base md:text-lg capitalize font-bold'>{category}</h1>
    
     </div>
    })}
    
    </div>

    </div>
  )
}

export default Category
