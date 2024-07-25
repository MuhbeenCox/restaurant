import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

const Quantity = ({ quantity, setQuantity }) => {

const decreamentQuantity=()=>{
  if(quantity>1){
return setQuantity(quantity-1)
  }
}
const increamentQuantity=()=>{
  setQuantity(quantity+1)
}
  return (
    <div className="flex  mt-2 items-center   rounded-sm  gap-x-3 max-md:h-8 md:h-11 max-w-40">
      
      <div className="flex items-center bg-gray-50  p-0 m-0  w-full h-full rounded-md">
        <lable
          disabled={quantity <= 1}
          onClick={decreamentQuantity}
          className={`${quantity <= 1 ? "text-gray-400" : "text-black"
            } cursor-pointer flex items-center justify-center text-sm md:px-2 px-1 `}
        >
          <Minus size={16} />
        </lable>
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
           className="max-w-16 text-center bg-white border-none p-0 mb-0 h-full"
          style={{ padding: 0, marginBottom: 0,backgroundColor:"white",height:"auto" }}
        ></input>
        <label
          className="cursor-pointer px-1 md:px-2 text-sm"
          onClick={increamentQuantity}
        >
          <Plus size={16} />
        </label>
      </div>
    </div>
  );
};

export default Quantity;
