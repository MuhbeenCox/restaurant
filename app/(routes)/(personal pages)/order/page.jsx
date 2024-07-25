"use client";
import { getData } from "@app/services";
import Box from "@components/Box";
import Loading from "@components/Loading";
import OrderList from "@components/orders/OrderList";
import PaginationButton from "@components/orders/PaginationButton";

import React, { useEffect, useState } from "react";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  console.log(pageSize, "check page size");
  const totalPages = Math.ceil(orders.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, orders.length);
  const currentData = [...orders].reverse().slice(startIndex, endIndex);
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    setCurrentPage(newPage);
  };

  const getOrder = async () => {
    try {
      setLoading(true);
      const res = await getData("order");
      setOrders(res?.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  if (!orders.length) {
    return (
      <div className="w-full h-screen flex justify-center bg-white items-center">
        <p>No orders found.</p>
      </div>
    );
  }
  return (
    <Box>
      <h2 className="font-medium  mb-3">
        My Orders{" "}
        <span className="text-sm text-softtext">({orders?.length})</span>
      </h2>

      {currentData.length > 0 &&
        currentData.map((order) => (
          <OrderList order={order} length={orders.length}></OrderList>
        ))}

      <PaginationButton
        handlePageChange={handlePageChange}
        pageSize={pageSize}
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
        setPageSize={setPageSize}
        totalPages={totalPages}
      ></PaginationButton>
    </Box>
  );
};

export default OrderPage;
