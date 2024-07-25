"use client";
import { getData } from "@app/services";
import Box from "@components/Box";
import Loading from "@components/Loading";
import OrderList from "@components/orders/OrderList";
import React, { useEffect, useState } from "react";

const PendingOrdersPage = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getorders = async () => {
    try {
      setLoading(true);
      const res = await getData("order");
      const filterPendingOrders = res?.orders?.filter(
        (items) =>
          items.status === undefined ||
          items.status === "making" ||
          items.status === "on way"
      );

      setPendingOrders(filterPendingOrders || []);
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
      <p className="text-softtext text-sm"> Total: {pendingOrders?.length}</p>
      {pendingOrders?.map((item) => (
        <OrderList order={item} admin={true} key={item._id} />
      ))}
    </Box>
  );
};

export default PendingOrdersPage;
