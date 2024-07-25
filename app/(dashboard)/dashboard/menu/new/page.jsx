"use client";
import React, { useState } from "react";

import { addData } from "@app/services";
import FoodItemForm from "@components/dashboard/FoodItemForm";
import EditableImage from "@components/dashboard/EditableImage";
import { userProfile } from "@app/customHooks/userProfile";
import { PuffLoader } from "react-spinners";
import Box from "@components/Box";

const AddItemPage = () => {
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const { pageLoading, userData } = userProfile();

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    setLoading(true);
    try {
      data = { image, ...data };
      const res = await addData("foodItem", data);
      setLoading(false);
      console.log(res, "check fooditem res in client side 112211");
    } catch (error) {
      console.log(error);
    }
  };

  if (!userData.admin) {
    return "you are not an Admin...";
  }
  if (pageLoading) {
    return (
      <div className="w-full h-full flex justify-center bg-white items-center">
        <PuffLoader size={100} color="#FFBE00" />
      </div>
    );
  }

  return (
    <Box>
      <div className="grid grid-cols-1 md:grid-cols-12  gap-x-3 gap-y-3 ">
        <div className="grid md:col-span-4 col-span-8  mt-6">
          <div className="flex justify-center items-center md:items-start">
            <EditableImage
              imageLoading={imageLoading}
              setImageLoading={setImageLoading}
              setImage={setImage}
              image={image}
              name="Upload"
            ></EditableImage>
          </div>
        </div>
        <FoodItemForm handleSubmit={handleSubmit} loading={loading} />
      </div>
    </Box>
  );
};

export default AddItemPage;
