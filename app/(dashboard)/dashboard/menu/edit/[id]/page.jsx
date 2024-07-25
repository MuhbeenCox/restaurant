"use client";
import { getData, updateData } from "@app/services";
import EditableImage from "@components/dashboard/EditableImage";
import FoodItemForm from "@components/dashboard/FoodItemForm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { userProfile } from "@app/customHooks/userProfile";
import { PuffLoader } from "react-spinners";
import Box from "@components/Box";

const EditPage = ({ params }) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [foodItem, setFoodItem] = useState();
  const { id } = params;

  const { pageLoading, userData } = userProfile();

  const router = useRouter();
  const getFoodItem = async () => {
    try {
      const res = await getData("foodItem");
      const getParticulardata = await res.data.find((item) => item._id === id);
      setFoodItem(getParticulardata && getParticulardata);
      setImage(getParticulardata?.image);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    setLoading(true);
    try {
      data = { image, _id: id, ...data };
      const res = await updateData("foodItem", data);
      setLoading(false);
      if (res.success) {
        router.push("/dashboard/menu");
      }
      console.log(res, "check res fooditem ");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFoodItem();
  }, []);
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
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-3 gap-y-3 ">
        <div className="grid col-span-4  mt-6">
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
        <FoodItemForm
          handleSubmit={handleSubmit}
          loading={loading}
          foodItem={foodItem}
        />
      </div>
    </Box>
  );
};

export default EditPage;
