"use client";
import { userProfile } from "@app/customHooks/userProfile";
import { getData, updateData } from "@app/services";
import Box from "@components/Box";
import UserForm from "@components/dashboard/UserForm";
import Loading from "@components/Loading";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const { status } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const { pageLoading, userData } = userProfile();
  console.log(userInfo, "check user info ");

  const handleProfileInfoUpdate = async (e, data) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateData("profile", data);
      setLoading(false);
      console.log(res, "check fooditem res in client side 112211");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const userdata = await getData("profile");
      setUserInfo(userdata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [status]);

  if (pageLoading) {
    return <Loading></Loading>;
  }

  return (
    <Box>
      <UserForm
        userInfo={userInfo}
        saveData={handleProfileInfoUpdate}
        loading={loading}
      />
    </Box>
  );
};

export default ProfilePage;
