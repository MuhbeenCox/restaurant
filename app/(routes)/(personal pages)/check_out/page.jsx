"use client";
import { CartContext, cartProductPrice } from "@app/contextProvider/Provider";
import { userProfile } from "@app/customHooks/userProfile";
import { addData } from "@app/services";
import AddressInputs from "@components/AddressInputs";
import Box from "@components/Box";
import CartCard from "@components/CartCard";
import EditableImage from "@components/dashboard/EditableImage";
import { Button } from "@components/ui/button";
import { ScrollArea } from "@components/ui/scroll-area";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const CheckOutPage = () => {
  const [addressData, setAddressData] = useState({});
  const [name, setName] = useState("");
  const [payment, setPayment] = useState("");
  const [screenShot, setScreenShot] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState("");
  const { userData } = userProfile();
  const { cartProducts, setCartProducts } = useContext(CartContext);

  const router = useRouter();

  const handleAddresChange = (name, value) => {
    setAddressData((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  useEffect(() => {
    if (userData?.city) {
      const { phone, name, city, postal, address } = userData;
      const addressFromProfile = { phone, city, postal, address };
      setAddressData(addressFromProfile);
      setName(name);
    }
  }, [userData]);

  const totalCartPrice = () => {
    let price = 0;
    cartProducts.forEach((item) => {
      price += cartProductPrice(item);
    });
    setTotalPrice(price);
  };

  useEffect(() => {
    totalCartPrice();
  }, [cartProducts]);

  function generateUniqueOrderId() {
    const min = 1000; // Minimum 4-digit number
    const max = 99999; // Maximum 5-digit number
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const orderId = generateUniqueOrderId();

      const formattedCartProducts = cartProducts.map((product) => ({
        productId: product._id,
        name: product.name,
        image: product.image,
        category: product.category,
        sizes: product.sizes?.name || null,
        extraIngredientPrices: product.extraIngredientPrices?.map((extras) => ({
          name: extras?.name || null,
        })),
        quantity: product.quantity,
        basePrice: product.basePrice,
      }));

      const orderdata = {
        name,
        phone: addressData.phone,
        city: addressData.city,
        address: addressData.address,
        postal: addressData.postal,
        paymentScreenshot: screenShot,
        cartProducts: formattedCartProducts,
        totalPrice,
        orderId,
      };

      const res = await addData("order", orderdata);
      console.log(res?.order._id, "check order response ....");

      if (res?.success) {
        router.push(`/order/${res?.order._id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // if (!cartProducts.length > 0) {
  //   return router.push("/");
  // }

  const isAddressDataComplete = () => {
    return (
      addressData.phone &&
      addressData.address &&
      addressData.city &&
      addressData.postal
    );
  };
  return (
    <Box>
      <div className=" flex flex-col gap-y-6  md:grid grid-cols-12 gap-x-6">
        <div className="md:col-span-7 ">
          <h2>Total Item : ({cartProducts?.length})</h2>
          <ScrollArea className="h-[300px] md:h-[400px] pr-4">
            {cartProducts?.map((item, index) => (
              <CartCard
                key={item._id}
                item={item}
                checkOut={true}
                Itemindex={index}
              />
            ))}
          </ScrollArea>
        </div>
        <div className=" col-span-5">
          <div className="px-4  py-2 bg-gray-50 rounded-md">
            <div className="flex flex-col  w-full">
              <label className="mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <AddressInputs
              addressProps={addressData}
              setAddressProps={handleAddresChange}
            ></AddressInputs>
          </div>

          <div className=" mt-6">
            <h1 className="bg-blue-400 py-2 px-4 rounded-md text-white text-center">
              Payment Methode
            </h1>

            <div className="mt-3">
              <div className="border py-2 rounded-md px-4 flex items-center gap-x-3">
                <label className="flex gap-x-3 cursor-pointer font-semibold">
                  <input
                    type="radio"
                    name="payment_method"
                    value="cash_on_delivery"
                    className="cursor-pointer"
                    checked={payment === "cash_on_delivery"}
                    onChange={() => setPayment("cash_on_delivery")}
                  ></input>{" "}
                  Cash on delivery
                </label>
                <Image
                  src="/assets/checkout/delivery.png"
                  width={50}
                  height={50}
                  alt="cash_on_delivery"
                  className="mb-3"
                ></Image>
              </div>

              <div className="border py-4 mt-3 flex flex-col gap-y-2 rounded-md px-4 relative  ">
                <div className="flex items-center gap-x-3">
                  <label className="font-semibold flex gap-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment_method"
                      value="online_transition"
                      checked={payment === "online_transition"}
                      className="cursor-pointer"
                      onChange={() => setPayment("online_transition")}
                    ></input>
                    Online Transitions
                  </label>

                  <Image
                    src="/assets/checkout/jazzcash.png"
                    width={50}
                    height={50}
                    alt="cash_on_delivery"
                  ></Image>
                  <Image
                    src="/assets/checkout/easypaisa.png"
                    width={50}
                    height={50}
                    alt="cash_on_delivery"
                  ></Image>
                  <Image
                    src="/assets/checkout/mezan_bank.png"
                    width={50}
                    height={50}
                    alt="cash_on_delivery"
                  ></Image>
                </div>
                <h2 className="flex gap-x-2 items-center  ">
                  <ShieldCheck color="green" size={17}></ShieldCheck> Secured
                </h2>

                <div
                  className={`transition duration-700 ${
                    payment === "online_transition"
                      ? ""
                      : "-translate-y-16 -z-10 opacity-0 absolute"
                  }`}
                >
                  <p className="text-softtext text-sm">
                    If you want to make your payment through online transactions
                    like JazzCash, EasyPaisa, or other bank transfers, please
                    pay your amount, take a screenshot, and upload it here.
                    Thank you!
                  </p>
                  <EditableImage
                    name={"upload"}
                    image={screenShot}
                    setImage={setScreenShot}
                    imageLoading={imageLoading}
                    setImageLoading={setImageLoading}
                  ></EditableImage>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button
                disabled={
                  !payment ||
                  (payment === "online_transition" && !screenShot) ||
                  loading ||
                  !isAddressDataComplete()
                }
                className="w-full flex items-center gap-x-2"
                onClick={handlePlaceOrder}
              >
                Place Order {loading && <ClipLoader size={17} color="#ffff" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default CheckOutPage;
