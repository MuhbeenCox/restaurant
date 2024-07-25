"use client";
import { CartContext, cartProductPrice } from "@app/contextProvider/Provider";
import EmptySection from "@components/EmptySection";
import Quantity from "@components/Quantity";
import { Button } from "@components/ui/button";
import { Eraser, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartCard from "@components/CartCard";

const CartPage = () => {
  const { cartProducts } = useContext(CartContext);
  // const { name, sizes, extraIngredientPrices, quantity, image, category } =
  //   cartProducts;

  const totalPrice = () => {
    let price = 0;
    cartProducts.forEach((item) => {
      price += cartProductPrice(item);
    });
    return price;
  };

  return (
    <section className="max-container md:px-12 px-4 padding-b min-h-screen bg-white w-full">
      {cartProducts?.length === 0 && (
        <div className="h-screen">
          {" "}
          <EmptySection label="Empty Cart"></EmptySection>
        </div>
      )}

      {cartProducts.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5 mt-4">
            <div className={`md:col-span-8     col-span-12`}>
              <div className="flex  items-center  w-full   pt-4">
                <h2 className=" text-sm md:text-lg text-center font-medium text-softtext">
                  Cart Items
                </h2>
              </div>

              <ScrollArea className=" h-[500px] md:h-[560px]  p-4">
                {cartProducts?.length > 0 &&
                  cartProducts.map((item, index) => (
                    <CartCard key={item._id} item={item} Itemindex={index} />
                  ))}
              </ScrollArea>
            </div>
            <div className="col-span-12 md:col-span-4">
              <div className=" rounded-md bg-gray-50 px-6 py-4 mt-9 md:mt-16">
                <div className="flex flex-col gap-y-3 justify-between mb-4">
                  <div className="flex justify-between border-b pb-1 md:pb-0">
                    <p className="md:text-lg text-sm text-black font-medium">
                      Total Items:
                    </p>
                    <p className="md:text-lg text-sm text-softtext">
                      {cartProducts.length}
                    </p>
                  </div>
                  <div className="flex justify-between border-b pb-1 md:pb-0">
                    <p className="md:text-lg text-sm text-black font-medium">
                      Total Price:
                    </p>
                    <p className="md:text-lg text-sm text-softtext">
                      Rs:{totalPrice()}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center w-full">
                  <Link
                    href="/check_out"
                    className="bg-blue-400 text-white text-center py-2 px-4 rounded-md w-full hover:bg-blue-500"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CartPage;
