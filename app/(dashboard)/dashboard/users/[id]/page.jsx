"use client";
import { userProfile } from "@app/customHooks/userProfile";
import { updateData } from "@app/services";
import Box from "@components/Box";
import UserForm from "@components/dashboard/UserForm";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

const UserEditPage = ({ params }) => {
  const { id } = params;

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { pageLoading, userData } = userProfile();
  const handleUserInfoUpdate = async (e, data) => {
    e.preventDefault();
    setLoading(true);
    data = { _id: id, ...data };
    const res = await updateData("profile", data);
    console.log(res, "update response ");
    setLoading(false);
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/profile/${id}`
      );
      setUser(data);
    } catch (error) {
      console.log("get req error", error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-full h-full flex justify-center bg-white items-center">
        <PuffLoader size={100} color="#F97316" />
      </div>
    );
  }
  if (!userData.admin) {
    return "Only admin can access this...";
  }

  return (
    <Box>
      <UserForm
        userInfo={user}
        saveData={handleUserInfoUpdate}
        loading={loading}
      />
    </Box>
  );
};

export default UserEditPage;
