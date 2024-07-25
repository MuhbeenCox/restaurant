"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Herocard from "./Herocard";

const HeroImagesSection = ({ headerImages }) => {
  const [bigItemShow, setBigItemShow] = useState("");

  useEffect(() => {
    if (headerImages) {
      setBigItemShow(headerImages.images[0] || "");
    }
  }, []);

  return (
    <div className="flex  lg:flex-row flex-col gap-x-8">
      <div className="mt-8 max-md:flex justify-center">
        <div className="w-[250px] md:w-[400px] relative h-[250px] md:h-[400px] rounded-full  border-8  border-green-500 border-double">
          <Image
            src={bigItemShow}
            className="object-contain p-3 w-full h-full absolute border-2  rounded-full "
            alt="main-image"
            quality={75}
            fill
          ></Image>
        </div>
      </div>
      <div className="flex  sm:justify-center flex-row lg:flex-col gap-4 mt-4">
        {headerImages?.images.map((img, index) => (
          <Herocard
            key={index}
            pizza={img}
            bigItemShow={bigItemShow}
            setBigItemShow={setBigItemShow}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroImagesSection;
