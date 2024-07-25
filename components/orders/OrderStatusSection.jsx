import Image from "next/image";
import React from "react";

const OrderStatusSection = ({ data }) => {
  return (
    <div className="grid md:grid-cols-4 grid-cols-2 w-full mt-16">
      <div className="flex items-center flex-col gap-y-3">
        <div className="w-20 h-20 relative">
          <Image
            src={"/assets/orders/payment.svg"}
            fill
            alt="payment"
            className="object-contain"
          />
        </div>

        <div className="flex flex-col items-center gap-y-1">
          <span className="font-semibold">Payment</span>
          <span className="px-2 rounded-sm text-white text-sm md:text-base py-1 bg-green-500">
            {data.paymentScreenshot ? "Completed" : "On Delivery"}
          </span>
        </div>
      </div>

      <div className="flex items-center flex-col gap-y-3 relative">
        <div className="w-20 h-20 relative">
          <Image
            src={"/assets/orders/making.svg"}
            fill
            alt="payment"
            className="object-contain"
          />
        </div>

        <div className="flex flex-col gap-y-1 items-center">
          <span className="font-semibold">Making</span>

          {["on way", "delivered"].includes(data?.status) && (
            <span className="bg-green-500 px-2 rounded-sm text-white text-sm md:text-base py-1">
              Completed
            </span>
          )}
        </div>

        {data.status === "making" && (
          <div className="absolute w-28 h-28 -top-5">
            <Image src="/assets/orders/spinner.svg" fill alt="spinner" />
          </div>
        )}
      </div>

      <div className="flex items-center relative flex-col gap-y-3 md:mt-0 mt-6">
        <div className="w-20 h-20 relative">
          <Image
            src={"/assets/orders/on_way.svg"}
            fill
            alt="payment"
            className="object-contain"
          />
        </div>

        <div className="flex flex-col gap-y-1 items-center">
          <span className="font-semibold">On way</span>

          {data.status === "delivered" && (
            <span className="bg-green-500 px-2 rounded-sm text-white text-sm md:text-base py-1">
              Completed
            </span>
          )}
        </div>

        {data.status === "on way" && (
          <div className="absolute w-32 h-[123px] -top-5">
            <Image src="/assets/orders/spinner.svg" fill alt="spinner" />
          </div>
        )}
      </div>
      <div className="flex items-center flex-col gap-y-3 relative md:mt-0 mt-6">
        <div className="w-20 h-20 relative">
          <Image
            src={"/assets/orders/delivered.svg"}
            fill
            alt="payment"
            className="object-contain"
          />
        </div>

        <span className="font-semibold">Delivered</span>

        {data.status === "delivered" && (
          <div className="absolute w-32 h-[123px] -top-5">
            <Image src="/assets/orders/spinner.svg" fill alt="spinner" />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusSection;
