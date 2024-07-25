"use client";
import { getData } from "@app/services";
import Box from "@components/Box";
import DashboardCard from "@components/dashboard/DashboardCard";
import Loading from "@components/Loading";
import React, { useEffect, useState } from "react";

const OverviewpPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllData = async () => {
    try {
      setLoading(true);
      const foodItems = await getData("foodItem");
      setProducts(foodItems?.data || []);
      const categories = await getData("category");
      setCategories(categories?.data || []);
      const users = await getData("users");
      console.log(users, "check user");
      setUsers(users?.data || []);
      const orders = await getData("order");

      setOrders(orders?.orders || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterUnreadOrders = orders?.filter((items) => items.isNewOrder);
  const filterPendingOrders = orders?.filter(
    (items) =>
      items.status === undefined ||
      items.status === "making" ||
      items.status === "on way"
  );

  useEffect(() => {
    getAllData();
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <Box>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 mt-9">
        <DashboardCard
          label="Food Item"
          length={products?.length}
          link="/dashboard/menu"
        ></DashboardCard>
        <DashboardCard
          label="Categories"
          length={categories?.length}
          link="/dashboard/categories"
        ></DashboardCard>
        <DashboardCard
          label="Orders"
          length={orders?.length}
          link="/dashboard/orders
          "
        ></DashboardCard>

        <DashboardCard
          label="Pending Orders"
          length={filterPendingOrders?.length}
          link="/dashboard/pending_orders"
        ></DashboardCard>
        <DashboardCard
          label="UnRead Orders"
          length={filterUnreadOrders?.length}
          link="/dashboard/unread_orders"
        ></DashboardCard>
        <DashboardCard
          label="Users"
          link="/dashboard/users"
          length={users?.length}
        ></DashboardCard>
      </div>
    </Box>
  );
};

export default OverviewpPage;
