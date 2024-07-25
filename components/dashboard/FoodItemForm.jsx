"use client";
import { Button } from "@components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClipLoader } from "react-spinners";
import MenuItemPriceProp from "./MenuItemPriceProp";
import { getData } from "@app/services";
const FoodItemForm = ({ handleSubmit, loading, foodItem }) => {
  const [categories, setCategories] = useState([]);
  const [isDiscount, setIsDiscount] = useState(false);
  const [name, setName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState([]);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [discount, setDiscount] = useState("");
  const [available, setAvailable] = useState(true);
  const getCategories = async () => {
    try {
      const res = await getData("category");
      setCategories(res.data);
      console.log(res, "check all categopries");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (foodItem) {
      setIsDiscount(!!foodItem.discount);
      setName(foodItem.name || "");
      setBasePrice(foodItem.basePrice || "");
      setDescription(foodItem.description || "");
      setCategory(foodItem.category || "");
      setSizes(foodItem.sizes || []);
      setExtraIngredientPrices(foodItem.extraIngredientPrices || []);
      setFeatured(foodItem.featured || false);
      setDiscount(foodItem.discount || "");
      setAvailable(foodItem.available || true);
    }
  }, [foodItem]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <form
      onSubmit={(e) =>
        handleSubmit(e, {
          name,
          basePrice,
          description,
          category,
          sizes,
          extraIngredientPrices,
          featured,
          discount,
          available,
        })
      }
      className="grid col-span-8 pb-12 mt-6 "
    >
      <div className="flex flex-col md:flex-row gap-2  ">
        <div className="flex flex-col w-full">
          <label className="text-neutral-500 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-neutral-500 mb-2">Category</label>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger className=" h-11">
              <SelectValue
                style={{ color: "red" }}
                placeholder=" Select Category"
              />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category, index) => (
                <SelectItem key={index} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 mt-2">
        <div className="flex  flex-col w-full">
          <label className="text-neutral-500 mb-2">Price</label>
          <input
            type="text"
            name="basePrice"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            placeholder="Price "
          />
        </div>
        <div className="flex flex-col items-start gap-2 w-full ">
          <div className="flex gap-x-3 text-neutral-500">
            <input
              type="checkbox"
              name="discountPrice"
              checked={isDiscount}
              className="cursor-pointer"
              onChange={() => setIsDiscount(!isDiscount)}
              placeholder="Product Name"
            />
            <label>Do you want to give a discount?</label>
          </div>
          <input
            type="text"
            name="discount"
            value={discount}
            disabled={!isDiscount}
            onChange={(e) => setDiscount(e.target.value)}
            className={`${!isDiscount && "cursor-not-allowed opacity-70"}`}
            placeholder="discount price %"
          />
        </div>
      </div>
      <MenuItemPriceProp
        props={sizes}
        setProps={setSizes}
        label={"Add item size"}
      ></MenuItemPriceProp>
      <MenuItemPriceProp
        props={extraIngredientPrices}
        setProps={setExtraIngredientPrices}
        label={"Add Extra Ingredients"}
      ></MenuItemPriceProp>
      <div>
        <div className="flex border rounded-lg gap-2 w-full">
          <textarea
            name="description"
            value={description}
            className="border-none"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
            rows={12}
            cols={12}
          />
        </div>
      </div>

      <div className="mt-3 px-3   flex md:flex-row flex-col gap-2">
        <div className="w-full border rounded flex items-center py-3 px-4">
          <div className="flex flex-col items-start gap-2 w-full ">
            <label className="flex gap-x-3 text-neutral-500">
              <input
                type="checkbox"
                name="featured"
                checked={available}
                className="cursor-pointer"
                onChange={() => setAvailable(!available)}
              />
              Availabe
            </label>

            <p className=" text-sm">This item is available or not. </p>
          </div>
        </div>{" "}
        <div className="w-full border rounded-lg flex items-center px-4">
          <div className="flex flex-col items-start gap-2 py-3 w-full ">
            <label className="flex gap-x-3 text-neutral-500">
              <input
                type="checkbox"
                name="featured"
                checked={featured}
                className="cursor-pointer"
                onChange={() => setFeatured(!featured)}
              />
              featured
            </label>

            <p className=" text-sm">
              This item being showing on the home page.{" "}
            </p>
          </div>
        </div>
      </div>
      <Button
        disabled={loading}
        type="submit"
        className="mt-5 text-lg flex gap-x-1"
      >
        Save {loading && <ClipLoader size={17} color="#ffffff" />}
      </Button>
    </form>
  );
};

export default FoodItemForm;
