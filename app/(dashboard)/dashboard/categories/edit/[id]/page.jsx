"use client";
import { getData, updateData } from "@app/services";
import Box from "@components/Box";
import CategoryForm from "@components/dashboard/CategoryForm";
import EditableImage from "@components/dashboard/EditableImage";
import React, { useEffect, useState } from "react";

const CategoryEditPage = ({ params }) => {
  const { id } = params;
  const [category, setCategory] = useState();
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      const catgories = await getData("category");
      console.log(catgories.data, "chek category");

      const getSingleCategory = await catgories?.data.find(
        (item) => item._id === id
      );

      setCategory(getSingleCategory);
      setImage(getSingleCategory?.image);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategory = async (e, data) => {
    e.preventDefault();
    try {
      const { name, slug } = data;
      setLoading(true);
      const res = await updateData("category", { name, slug, image, id });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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
          handleSubmit={updateCategory}
          category={category}
          loading={loading}
        ></CategoryForm>
      </div>
    </Box>
  );
};

export default CategoryEditPage;
