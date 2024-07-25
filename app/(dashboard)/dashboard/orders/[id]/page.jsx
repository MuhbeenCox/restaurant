import { getSingleData } from "@app/services";
import Box from "@components/Box";
import OrderDetailCard from "@components/orders/OrderDetailCard";
import OrderImageCard from "@components/orders/OrderImageCard";

import OrderStatusSection from "@components/orders/OrderStatusSection";
import React from "react";

const getOrderById = async (id) => {
  try {
    const res = await getSingleData("order", id);
    return res.order;
  } catch (error) {
    console.log(error);
  }
};

const OrderDetailPage = async ({ params }) => {
  const { id } = params;

  const data = await getOrderById(id);
  return (
    <Box>
      <div className="flex flex-col items-center">
        <div className="md:grid md:grid-cols-2 flex flex-col-reverse gap-y-6 gap-x-4 mt-11">
          <div className="md:col-span-1 w-full ">
            <div className="flex justify-start items-center gap-x-3 gap-y-3 flex-wrap w-full">
              {data?.cartProducts.map((cart) => (
                <OrderImageCard
                  foodItem={cart}
                  key={cart.productId}
                ></OrderImageCard>
              ))}
            </div>
          </div>
          {data && (
            <div className="w-full ">
              <OrderDetailCard data={data} admin={true}></OrderDetailCard>
            </div>
          )}
        </div>

        {/* Status section */}

        <OrderStatusSection data={data}></OrderStatusSection>
      </div>
    </Box>
  );
};

export default OrderDetailPage;
