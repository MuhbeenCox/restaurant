import Image from "next/image";
import React from "react";

const Herocard = ({ pizza, bigItemShow, setBigItemShow }) => {
  const changeImage = (img) => {
    setBigItemShow(img);
  };
  return (
    <div
      className={`${
        pizza === bigItemShow
          ? "border-4 border-white border-dashed animate-spin"
          : "border border-white"
      }  w-28 h-28 md:w-32 aspect-square md:h-32 rounded-full border-2  relative`}
    >
      <Image
        onClick={() => changeImage(pizza)}
        src={pizza}
        className="w-full h-full p-2 object-contain rounded-full border-green-500 border cursor-pointer   absolute"
        fill
        alt={pizza}
      ></Image>
    </div>
  );
};

export default Herocard;
