import { Button } from "@components/ui/button";
import { UploadIcon, Images } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

export default function EditableImage({
  imageLoading,
  setImageLoading,
  avatar,
  setImage,
  setImages,
  images,
  image,
  name,
  multiple = false,
}) {
  const uploadImg = async (value) => {
    try {
      if (!value) {
        toast.error("No file selected");
        return;
      }

      setImageLoading(true);
      const formData = new FormData();
      formData.append("file", value);
      formData.append("upload_preset", "msportfolio");

      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/msworlddev/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!uploadResponse.ok) {
        toast.error("Failed to upload image");
      }

      const uploadedImageData = await uploadResponse.json();
      const imgUrl = uploadedImageData.secure_url;

      if (multiple) {
        setImages((prev) => [...prev, imgUrl]);
      } else {
        setImage(imgUrl);
      }

      setImageLoading(false);

      toast.success("Uploaded");
    } catch (error) {
      setImageLoading(false);
      toast.error("Failed to upload image");
    }
  };

  return (
    <div className="flex flex-col mt-4 items-center gap-y-4">
      {imageLoading && (
        <div className="w-[100px] h-[100px]  md:w-[150px] md:h-[150px]  bg-gray-50 animate-pulse relative"></div>
      )}
      {image && !imageLoading ? (
        <div
          className={`${
            imageLoading && "hidden"
          } relative w-[100px] h-[100px]  md:w-[150px] md:h-[150px] shadow-lg rounded-lg p-2  `}
        >
          <Image
            src={image || (avatar && avatar)}
            fill
            className={` rounded-lg object-contain   `}
            alt={name}
          ></Image>
        </div>
      ) : (
        <label
          htmlFor={images?.length > 2 ? "" : "upload"}
          className={`${
            imageLoading && "hidden"
          } border rounded-lg cursor-pointer relative w-[100px] h-[100px] md:w-[150px] md:h-[150px] flex flex-col justify-center items-center gap-y-2`}
        >
          <Images></Images>
          <span className="text-sm">No Image</span>
        </label>
      )}

      <input
        type="file"
        name="image"
        id="upload"
        className="hidden"
        onChange={(e) => uploadImg(e.target.files[0])}
      ></input>
      <Button
        disabled={multiple && images.length > 2}
        variant="outline"
        className="flex gap-2 mt-3"
      >
        <label htmlFor="upload" className="flex items-center gap-x-2">
          {" "}
          <UploadIcon size={17}></UploadIcon>
          {name} {imageLoading && <ClipLoader size={17} color="#D3D3D3" />}
        </label>
      </Button>
    </div>
  );
}
