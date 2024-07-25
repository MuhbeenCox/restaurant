"use client";
import React, { useState } from "react";

import StatusSelect from "./StatusSelect";
import { formatDateTime } from "@components/formatDateTime";
import { updateData } from "@app/services";

const OrderDetailCard = ({ data, admin }) => {
  const {
    orderId,
    name,
    phone,
    city,
    address,
    createdAt,
    paymentScreenshot,
    totalPrice,
    _id,
    status,
  } = data;

  const [orderStatus, setOrderStatus] = useState(status ? status : "");
  const handleStatus = async (value) => {
    try {
      const data = { value, _id };
      const res = await updateData("order", data);
      if (res.success) {
        setOrderStatus(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex justify-center ">
      <div className="border bg-gray-50 w-full rounded-sm py-4 px-6">
        <h1 className="text-xl font-bold w-full text-center mb-4">
          Order Detail
        </h1>

        <div className="flex justify-between items-center">
          <span className="text-softtext text-sm md:text-base">Order ID</span>
          <span className="font-medium text-sm md:text-base">{orderId}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-softtext text-sm md:text-base">
            Customer Name
          </span>
          <span className="font-medium text-sm md:text-base">{name}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-softtext text-sm md:text-base">Phone</span>
          <span className="font-medium text-sm md:text-base">{phone}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-softtext text-sm md:text-base">City</span>
          <span className="font-medium text-sm md:text-base">{city}</span>
        </div>
        <div className="flex h-auto gap-x-4 md:justify-between items-center">
          <span className="text-softtext md:text-base w-32 grow">Address</span>
          <span className="font-medium text-sm md:text-base flex flex-wrap text-right justify-end w-full md:w-auto">
            {address}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-softtext text-sm md:text-base">Time</span>
          {/* <span className="font-medium text-sm md:text-base">
            {formatDateTime(data?.createdAt)}
          </span> */}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-softtext text-sm md:text-base">
            Payment Method
          </span>
          <span className="font-medium text-green-500 text-sm md:text-base">
            {paymentScreenshot ? "Online Transaction" : "Cash On Delivery"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-softtext text-sm md:text-base">Bill</span>
          <span className="font-medium text-sm md:text-base">
            Rs:{totalPrice}
          </span>
        </div>
        {admin && (
          <div className="flex justify-between items-center mt-2">
            <span className="text-softtext text-sm md:text-base">Status</span>
            <StatusSelect status={orderStatus} handleStatus={handleStatus} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailCard;
