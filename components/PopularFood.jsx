import React from "react";
import ProductCard from "./ProductCard";
import Heading_section from "./Heading_section";

const PopularFood = ({ popularFood }) => {
  const filterPopularFood = popularFood.filter((item) => item.featured);

  return (
    <section className=" w-full padding-x py-8">
      <Heading_section heading="Our Popular Food" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 md:gap-x-4 gap-y-16 pt-8 mt-11">
        {[...filterPopularFood]
          ?.reverse()
          .map(
            (item, index) =>
              index < 8 && <ProductCard key={item?._id} products={item} />
          )}
      </div>
    </section>
  );
};

export default PopularFood;
