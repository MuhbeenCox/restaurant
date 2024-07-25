import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { formatDateTime } from "@components/formatDateTime";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { updateData } from "@app/services";
const OrderList = ({ order, admin }) => {
  const [showPayment, setShowPayment] = useState(false);

  const handleViewClick = async (_id) => {
    try {
      if (admin && order?.isNewOrder) {
        const data = { _id, isNewOrder: false };
        await updateData("order", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-b  mt-3 pt-2 pb-4 flex flex-col md:flex-row justify-between items-center relative ">
      <div className="flex items-center justify-start gap-x-2 w-full md:w-52 flex-wrap">
        {order?.cartProducts.slice(0, 3).map((cart, index) => (
          <div
            key={cart.productId + index}
            className="h-11 w-11 relative flex items-center shadow-md bg-white"
          >
            <Image
              src={cart?.image}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt={cart?.name}
              className="object-contain"
            />
          </div>
        ))}
        {order?.cartProducts.length > 3 && (
          <span className="text-sm text-green-400 font-semibold">
            (+{order?.cartProducts.length - 3})
          </span>
        )}
      </div>
      <div className="flex gap-x-2 md:min-w-56 w-full md:max-w-56 flex-wrap pt-2 md:pt-0">
        {order?.cartProducts.slice(0, 3).map((cart, index) => (
          <div key={cart.productId + index} className="flex">
            <p className="text-sm">
              {cart.name}
              {index < order.cartProducts.slice(0, 3).length - 1 && " +"}
            </p>
          </div>
        ))}
        {order?.cartProducts.length > 3 && (
          <span className="text-green-400 text-sm">
            (+{order.cartProducts.length - 3})
          </span>
        )}
      </div>
      <div className="md:flex  hidden">{formatDateTime(order?.createdAt)}</div>
      <div>
        <span className="bg-gray-100 hidden md:flex px-2 py-1 font-medium rounded-sm w-16">
          {order?.orderId}
        </span>
      </div>

      <div className="flex gap-x-4 flex-wrap gap-y-2 items-center justify-start max-md:w-full mt-2 md:mt-0">
        <p
          className={`${
            !order?.paid && "bg-red-500 w-28"
          } text-white py-1 px-3 rounded-sm flex items-center shadow-md text-sm justify-center`}
        >
          {order?.paid ? (
            <Dialog open={showPayment} onOpenChange={setShowPayment}>
              <DialogTrigger>
                <div
                  onClick={() => setShowPayment(!showPayment)}
                  className="w-11 h-11 md:w-20 md:h-20 relative flex justify-center items-center"
                >
                  <Image
                    src={order?.paymentScreenshot}
                    fill
                    className="object-contain"
                    alt="payment"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="flex justify-center items-center">
                <div className="md:w-96 md:h-96 w-72 h-96 relative flex justify-center items-center">
                  <Image
                    src={order?.paymentScreenshot}
                    fill
                    className="object-contain"
                    alt="payment"
                  />
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            "On Delivery"
          )}
        </p>
        {!order?.status && (
          <p className="bg-red-500 text-white py-1 px-3 rounded-sm flex items-center w-20 text-sm justify-center capitalize">
            pending
          </p>
        )}
        {order?.status && (
          <p
            className={`${
              order?.status === "making"
                ? "bg-yellow-500"
                : order?.status === "on way"
                ? "bg-sky-500"
                : "bg-green-500"
            } text-white py-1 px-3 rounded-sm flex items-center shadow-md w-20 text-sm justify-center capitalize`}
          >
            {order?.status}
          </p>
        )}

        <Link
          onClick={() => handleViewClick(order?._id)}
          href={`${
            admin ? `/dashboard/orders/${order?._id}` : `/order/${order?._id}`
          }`}
          className="text-white py-1 bg-emerald-500 px-3 rounded-sm shadow-md flex items-center w-20 text-sm justify-center"
        >
          View
        </Link>
      </div>

      {admin && order?.isNewOrder && (
        <span className="bg-red-500 absolute md:-left-16 max-md:right-0 top-3 md:top-1/3  text-sm leading-6 text-white rounded-sm flex justify-center items-center shadow-md  px-2 ">
          New{" "}
        </span>
      )}
    </div>
  );
};

export default OrderList;
