import { Button } from '@components/ui/button';
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';

const CategoryForm = ({handleSubmit,loading,category}) => {
    const [name,setName]=useState("");
    const [slug,setSlug]=useState("");
    console.log(category,"check single category  1122");

  
const resetForm=()=>{
  setName("");
  setSlug("");
}


useEffect(()=>{
if(category){
setName(category?.name || "");
setSlug(category?.slug || "");
}
},[category])
  return (
    <form className='flex-1 flex  gap-2 flex-col' onSubmit={(e)=>handleSubmit(e,{name,slug},resetForm)}>
    <div className="flex flex-col w-full">
      <label className="text-neutral-500 mb-2">Name</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category Name"
      />
    </div>
    <div className="flex flex-col w-full">
      <label className="text-neutral-500 mb-2">Slug</label>
      <input
        type="text"
        name="name"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="Slug Name"
      />
    </div>

    <Button
        disabled={loading}
        type="submit"
        className="mt-5 text-lg flex gap-x-1"
      >
       {category ? "Update":"Save"}  {loading && <ClipLoader size={17} color="#ffffff" />}
      </Button>
    </form>
  )
}

export default CategoryForm