"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Heart, ShoppingBasket, ShoppingBasketIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@app/contextProvider/Provider";
import ProductDescription from "./ProductDescription";
import { WishListContext } from "@app/contextProvider/WishListContext";
import WishlistButton from "./WishlistButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function ProductCard({ products }) {
  const {
    name,
    basePrice,
    description,
    sizes,
    category,
    extraIngredientPrices,
    featured,
    discount,
    available,
    image,
  } = products;

  const [showPopup, setShowPopup] = useState(false);
  const session = useSession();
  const router = useRouter();
  const { addToCart } = useContext(CartContext);

  const handleAddToCartButton = (selectedSize, selectedExtras, quantity) => {
    const hasOptions = sizes?.length > 0 || extraIngredientPrices?.length > 0;

    if (session.status === "unauthenticated") {
      router.push("/sign-in");
    }

    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }

    if (showPopup) {
      addToCart(products, selectedSize, selectedExtras, quantity);
    } else {
      addToCart(products);
    }
  };

  return (
    <>
      {showPopup && (
        <Dialog
          style={{ padding: "10px 40px" }}
          open={showPopup}
          onOpenChange={setShowPopup}
        >
          <DialogContent className=" ">
            <div className="md:grid flex flex-col gap-y-11 md:grid-cols-12 gap-x-5 my-5 ">
              <div className="md:col-span-5 ">
                <div className="group border rounded-lg shadow-md  h-full w-auto flex  justify-center">
                  <Image
                    src={image}
                    width={280}
                    height={280}
                    alt="products"
                    className="group-hover:scale-105 transition-all object-contain bg-center duration-500 max-h-full"
                  />
                </div>
              </div>
              <div className="md:col-span-7 ps-4 ">
                <ProductDescription
                  item={products}
                  handleAddToCartButton={handleAddToCartButton}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <Card className="group h-auto cursor-pointer relative">
        <CardHeader className=" max-md:p-0">
          <Link href={`/menu/${products._id}`}>
            <div className="flex relative justify-center items-center w-full h-24 md:h-36   md:max-h-36">
              <Image
                src={image}
                fill
                alt="products"
                className="group-hover:scale-105 transition-all object-contain duration-500 py-3 md:py-0"
              />
            </div>
          </Link>
        </CardHeader>
        <CardContent
          className="  p-2 grow
        "
        >
          <CardTitle className="font-semibold text-sm mt-2 md:text-lg capitalize   w-full text-center">
            {name}
          </CardTitle>
          <CardDescription className="flex  items-center justify-center w-full text-sm  text-center text-softtext md:min-h-16">
            {description?.length > 40
              ? `${description.substring(0, 40)}...`
              : description}
          </CardDescription>
        </CardContent>
        <CardFooter className="  max-md:p-2">
          <div className="flex justify-between items-center mt-2 w-full">
            <div className="flex items-center gap-x-2 md:flex flex-col">
              <label className="font-semibold text-black max-md:text-sm flex">
                RS:{" "}
                <span
                  className={`${discount ? "text-red-500 line-through" : ""}`}
                >
                  {basePrice}
                </span>
              </label>
              {discount && (
                <label className="font-semibold text-black max-md:text-sm flex">
                  RS:{" "}
                  <span>
                    {Math.round(basePrice - (basePrice * discount) / 100)}
                  </span>
                </label>
              )}
            </div>
            <Button
              type="button"
              onClick={handleAddToCartButton}
              className="flex items-center gap-x-2 max-md:p-2"
            >
              <ShoppingBasket size={20} />
            </Button>
          </div>
        </CardFooter>
        <WishlistButton foodId={products._id}></WishlistButton>
        {discount && (
          <label className="bg-red-600 text-white absolute top-3 left-3 md:top-4 md:left-3 md:px-3 text-center shadow-lg">
            Sale
          </label>
        )}
      </Card>
    </>
  );
}

export default ProductCard;
