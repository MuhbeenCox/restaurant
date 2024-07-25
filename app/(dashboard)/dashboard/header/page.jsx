"use client";
import { addData, getData, updateData } from "@app/services";
import Box from "@components/Box";
import EditableImage from "@components/dashboard/EditableImage";
import { Button } from "@components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const HeaderPage = () => {
  const [imageLoading, setImageLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [headerData, setHeaderData] = useState();
  const [update, setUpdate] = useState(false);
  console.log(headerData, "check headerdata");
  const getHeaderData = async () => {
    try {
      const data = await getData("header");
      if (data?.header[0]) {
        setHeaderData(data?.header[0]);
        setHeading(data?.header[0].heading || "");
        setDescription(data?.header[0]?.description || "");
        setImages(data?.header[0].images || []);
        setUpdate(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = { heading, description, images };
      const res = update
        ? await updateData("header", { ...data, _id: headerData._id })
        : await addData("header", data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  useEffect(() => {
    getHeaderData();
  }, []);
  return (
    <Box>
      <div className="flex md:flex-row flex-col max-md:gap-y-6 gap-x-6">
        <div className="flex-1 flex flex-col items-center w-full">
          <EditableImage
            imageLoading={imageLoading}
            setImageLoading={setImageLoading}
            name="Upload"
            images={images}
            setImages={setImages}
            multiple={true}
          ></EditableImage>

          <div className="flex justify-center gap-x-2 items-center mt-5 flex-wrap bg-gray-50 px-6 py-3">
            {images?.map((image, index) => (
              <div
                key={index}
                className="border rounded-md bg-white  h-20 w-20 relative md:h-32 md:w-32 m group flex  items-center justify-center overflow-hidden"
              >
                <Image
                  src={image}
                  fill
                  className="object-contain p-2"
                  alt={`Image ${index + 1}`}
                />
                <div className="w-full h-full absolute top-0 left-0 bg-black/60 flex justify-center items-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <span
                    onClick={() => handleDelete(index)}
                    className="w-9 h-9 rounded-full flex justify-center items-center bg-white transition-transform duration-300  scale-0 group-hover:scale-100 cursor-pointer"
                  >
                    <Trash2 color="red" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex   py-6 px-4">
          <form
            onSubmit={handleSave}
            className=" w-full h-full flex flex-col gap-y-3"
          >
            <div className="flex  flex-col w-full ">
              <label className="text-neutral-500 mb-1">Heading</label>
              <input
                type="text"
                name="heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="Heading "
              />
            </div>
            <div className="flex  flex-col w-full">
              <label className="text-neutral-500 mb-1">Description</label>
              <textarea
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description "
                className="mt-1 h-32 resize-none border rounded-md p-2"
              />
            </div>
            <Button type="submit">
              {" "}
              {headerData ? "Update" : "Save"}{" "}
              {loading && <ClipLoader size={17} color="#ffffff" />}
            </Button>
          </form>
        </div>
      </div>
    </Box>
  );
};

export default HeaderPage;
