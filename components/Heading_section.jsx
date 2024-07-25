import Image from "next/image";
import React from "react";

const Heading_section = ({ heading }) => {
  return (
    <div className="mx-auto padding-x text-center">
      <div className="relative  inline-block">
        <h1 className="text-center text-2xl font-bold text-black">{heading}</h1>

        <div className="relative w-full mt-2 flex justify-center">
          <Image
            src="/assets/images/bottom_line.png"
            width={220}
            height={50}
            alt="bottom_line"
          />
        </div>
      </div>
    </div>
  );
};

export default Heading_section;
