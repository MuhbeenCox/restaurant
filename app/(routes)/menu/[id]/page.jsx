
import { getSingleData } from "@app/services";
import ProductDescription from "@components/ProductDescription";;
import ReviewSection from "@components/ReviewSection";
import { ChevronRight, Home,  Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";



const getData = async (id) => {
  try {
    const res = await getSingleData("foodItem", id)
    return res;
  } catch (error) {
    console.log(error)
  }

}


const MenuItemPage = async({ params }) => {
const foodData= await getData(params.id);
const {data}= foodData;

  const id = params.id;


  return (
    <section className="bg-white w-full  padding-x pt-12 padding-b ">
    
      <div className="flex items-center gap-x-1   mb-6 ">
        <Link href={"/"} className="flex gap-1 items-center text-softtext cursor-pointer">
          <Home size={15} />
          <span className=" hover:text-primary  text-sm  ">
            {" "}
            Home
          </span>
        </Link>
        <span className="text-softtext">
          <ChevronRight size={15}></ChevronRight>
        </span>
        <div className="flex gap-1 items-center cursor-pointer text-softtext">
          <Utensils size={15}> </Utensils> <span className="hover:text-primary text-softtext text-sm">Product</span>
        </div>
      </div>
      <div className="flex gap-x-14 md:flex-row flex-col">
        <div className="flex-1 relative flex justify-center items-center shadow-md   rounded-lg ">
          <Image
            src={data?.image}
            width={400}
            height={400}
            alt="image"
            className=" object-contain"
          />
        </div>
        <div className="flex-1 pt-12 flex flex-col">
<ProductDescription item={data && data}  />
        </div>
      </div>

<ReviewSection foodId={id}></ReviewSection>


      {/* <div className="mt-20 py-12">
        <Heading_section heading="Our Related Food" />

        <div className="mt-11">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {products?.map(
              (item, index) =>
                index < 4 && <ProductCard key={index} products={item} />
            )}
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default MenuItemPage;
