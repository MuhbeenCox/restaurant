import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import Heading_section from "./Heading_section";

const Deals = ({ foodItems }) => {
  const filterFoodItems = foodItems?.filter((item) => {
    return item.category === "deals";
  });
  return (
    <section className=" pt-12 w-full  overflow-x-hidden">
      {/* <h2 className="text-center text-2xl font-bold text-black">Our Deals</h2> */}
      <Heading_section heading="Our Deals"></Heading_section>
      <div className=" w-[98%] max-w-[1250px] overflow-visible p-8  px-12 mx-auto ">
        <Carousel className="w-full ">
          <CarouselContent className="-ml-1">
            {filterFoodItems?.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-1  md:basis-1/2 lg:basis-1/4"
              >
                <div className="p-1 py-12">
                  <ProductCard key={index} products={item} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Deals;
