import Image from "next/image";
import React from "react";

const OrderImageCard = ({ foodItem }) => {
  return (
    <div className="md:h-40 md:w-40 w-32 group h-32 cursor-pointer flex flex-col items-center border rounded-md px-3 py-2">
      <div className="md:w-28  md:h-28 w-20 h-20 flex justify-center items-center relative">
        <Image
          src={foodItem.image}
          fill
          className="object-contain group-hover:scale-110 transition-all duration-500 "
          alt={foodItem.name}
        />
      </div>

      <p className="text-sm text-softtext text-center">{foodItem.name}</p>
    </div>
  );
};

export default OrderImageCard;
