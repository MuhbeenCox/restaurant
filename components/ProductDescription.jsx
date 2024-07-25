"use client";
import { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ShoppingBasketIcon } from "lucide-react";
import Quantity from "./Quantity";
import { CartContext } from "@app/contextProvider/Provider";
import { ReviewContext } from "@app/contextProvider/ReviewContext";
import StarRatings from "react-star-ratings";

const ProductDescription = ({ item }) => {
  const [selectedSize, setSelectedSize] = useState(item?.sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(item?.basePrice);
  const { addToCart } = useContext(CartContext);
  const { totalRating } = useContext(ReviewContext);

  const handleCart = () => {
    addToCart(item, selectedSize, selectedExtras, quantity);
  };

  const handleExtraButtonClick = (ev, extraThing) => {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((extras) => {
        const data = [...extras, extraThing];
        return data;
      });
    } else {
      setSelectedExtras((extras) => {
        return extras.filter((item) => item._id !== extraThing._id);
      });
    }
  };

  const calculateTotalPrice = () => {
    let price = selectedSize
      ? parseFloat(selectedSize.price)
      : parseFloat(item?.basePrice);
    if (selectedExtras) {
      selectedExtras.forEach((extras) => {
        price += parseFloat(extras.price);
      });
    }
    setTotalPrice(price * quantity);
  };
  useEffect(() => {
    calculateTotalPrice();
  }, [selectedSize, selectedExtras, quantity]);

  return (
    <div className="w-full flex flex-col gap-y-2">
      <h2 className="text-2xl text-black  font-semibold capitalize">
        {item?.name}
      </h2>
      <p className="text-softtext text-sm md:text-base 2xl:text-lg">
        {item?.description}
      </p>
      <div className="flex items-center gap-x-3 ">
        <label className="py-1 capitalize bg-sky-50 text-sky-600 2xl:text-base text-sm rounded-md px-3">
          {item?.category}
        </label>
        <label className="py-1 bg-green-50 text-green-600 text-sm rounded-md 2xl:text-base px-3">
          {item?.available ? "Available" : "Not available"}
        </label>
      </div>
      <div className="flex gap-x-2">
        <StarRatings
          rating={totalRating}
          starRatedColor="orange"
          numberOfStars={5}
          name="rating"
          starDimension="14px"
          starSpacing="3px"
        ></StarRatings>{" "}
        {totalRating}
      </div>

      {item?.sizes.length > 0 && (
        <div className="mt-2 flex gap-x-2 ">
          {item?.sizes.map((size) => (
            <label
              onClick={() => setSelectedSize(size)}
              className={`${
                size.name === selectedSize?.name
                  ? "border-primary bg-gray-50 shadow-md  "
                  : ""
              } border rounded-md min-w-20 text-center max-w-32 p-2 cursor-pointer text-sm md:text-base 2xl:text-lg  2xl:py-4 2xl:px-4 capitalize`}
              key={size._id}
            >
              {size?.name}
            </label>
          ))}
        </div>
      )}

      {item?.extraIngredientPrices.length > 0 && (
        <div className="  rounded-md w-full mt-2 ">
          <h2 className="mb-2 font-semibold ">Extra Ingredients:</h2>
          <div className="flex gap-x-3 items-center">
            {item?.extraIngredientPrices?.map((extraThing, index) => (
              <label
                key={extraThing._id}
                className={`${
                  selectedExtras.some((item) => item._id === extraThing._id)
                    ? "border-primary border shadow-md"
                    : "border"
                } flex items- mb-1  rounded-md py-3 text-sm md:text-base 2xl:text-lg  cursor-pointer px-2 gap-x-1`}
              >
                {" "}
                <input
                  type="checkbox"
                  name={extraThing.name}
                  id="extraIngredientPrices"
                  className="hidden"
                  onClick={(ev) => handleExtraButtonClick(ev, extraThing)}
                ></input>{" "}
                {extraThing.name} +Rs: {extraThing.price}
              </label>
            ))}
          </div>
        </div>
      )}

      <Quantity quantity={quantity} setQuantity={setQuantity}></Quantity>

      <Button
        type="button"
        onClick={handleCart}
        className="flex gap-x-2 mt-3 2xl:text-lg"
      >
        Add to cart <ShoppingBasketIcon size={20} /> RS: {totalPrice}
      </Button>
    </div>
  );
};

export default ProductDescription;
