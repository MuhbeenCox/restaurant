"use client";
import { getData } from "@app/services";
import Box from "@components/Box";
import Loading from "@components/Loading";
import OrderList from "@components/orders/OrderList";
import React, { useEffect, useState } from "react";

const Unread_orders_page = () => {
  const [unreadOrders, setUnreadOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const getorders = async () => {
    try {
      setLoading(true);
      const res = await getData("order");
      const filterUnreadOrders = res?.orders?.filter(
        (items) => items.isNewOrder
      );
      setUnreadOrders(filterUnreadOrders || []);
      return res?.orders;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getorders();
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <Box>
      <p className="text-softtext text-sm"> Total: {unreadOrders?.length}</p>
      {unreadOrders?.map((item) => (
        <OrderList order={item} admin={true} key={item._id} />
      ))}
    </Box>
  );
};

export default Unread_orders_page;
