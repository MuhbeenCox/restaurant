import React, { useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import { Button } from "@components/ui/button";
import { ClipLoader } from "react-spinners";
import { userProfile } from "@app/customHooks/userProfile";
import AddressInputs from "@components/AddressInputs";

const UserForm = ({ userInfo, saveData, loading }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [postal, setPostal] = useState("");
  const [admin, setAdmin] = useState(false);

  const [imageLoading, setImageLoading] = useState(false);

  const { userData: loggedInUserData } = userProfile();

  console.log(city, "cheking address");

  const handleAddressInputs = (name, value) => {
    switch (name) {
      case "phone":
        setPhone(value);
        break;
      case "city":
        setCity(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "postal":
        setPostal(value);
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || "");
      setEmail(userInfo.email || "");
      setImage(userInfo.image || "");
      setPhone(userInfo.phone || "");
      setCity(userInfo.city || "");
      setAddress(userInfo.address || "");
      setAdmin(userInfo.admin || false);
      setPostal(userInfo.postal || "");
    }
  }, [userInfo]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 space-y-10 ">
      <div className="col-span-5  flex items-center justify-center">
        <EditableImage
          imageLoading={imageLoading}
          setImageLoading={setImageLoading}
          setImage={setImage}
          image={image}
          avatar={"/assets/avatarr.jpg"}
          name="Change Profile"
        ></EditableImage>
      </div>

      <div className="col-span-7 bg-white/50">
        <form
          onSubmit={(e) =>
            saveData(e, {
              name,
              email,
              image,
              city,
              address,
              postal,
              phone,
              admin,
            })
          }
        >
          <div className="md:flex w-full gap-x-3  items-center">
            <div className="flex flex-col  w-full">
              <label className="mb-2">Username</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col  w-full ">
              <label className="mb-2">Email</label>
              <input
                type="text"
                name="email"
                value={userInfo?.email}
                disabled
              />
            </div>
          </div>
          <AddressInputs
            addressProps={{ phone, city, address, postal }}
            setAddressProps={handleAddressInputs}
          ></AddressInputs>

          {loggedInUserData?.admin && (
            <label htmlFor="admin" className="flex gap-2 items-center">
              <input
                id="admin"
                type="checkbox"
                onChange={() => {
                  setAdmin(!admin);
                }}
                checked={admin}
              ></input>{" "}
              <span>Admin</span>
            </label>
          )}

          <div className="mt-2 w-full ">
            <Button
              disabled={loading}
              type="submit"
              className="w-full cursor-pointer text-lg"
            >
              {loading ? (
                <div className="flex items-center gap-x-4">
                  Save <ClipLoader size={20} color="#ffff" />
                </div>
              ) : (
                "save"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
