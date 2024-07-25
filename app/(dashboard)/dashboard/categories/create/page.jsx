"use client";
import { addData } from "@app/services";
import Box from "@components/Box";
import CategoryForm from "@components/dashboard/CategoryForm";
import EditableImage from "@components/dashboard/EditableImage";
import React, { useState } from "react";

const CreateCategoryPage = () => {
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e, data, resetForm) => {
    e.preventDefault();
    const { name, slug } = data;
    try {
      setLoading(true);
      const res = await addData("category", { name, slug, image });
      if (res?.success) {
        resetForm();
        setImage("");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <div className="flex gap-6">
        <div className="flex-1 justify-center flex ">
          <EditableImage
            imageLoading={imageLoading}
            setImageLoading={setImageLoading}
            setImage={setImage}
            image={image}
            name="Upload"
          ></EditableImage>
        </div>
        <CategoryForm
          handleSubmit={handleSubmit}
          loading={loading}
        ></CategoryForm>
      </div>
    </Box>
  );
};

export default CreateCategoryPage;
