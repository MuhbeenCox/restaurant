import { Button } from "@components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import React from "react";

const MenuItemPriceProp = ({ props, setProps, label }) => {
  const addProp = () => {
    setProps((pre) => {
      return [...pre, { name: "", price: "" }];
    });
  };

  const removeProp = (indexToRemove) => {
    setProps((pre) => pre.filter((v, index) => index !== indexToRemove));
  };
  const editProp = (value, index, name) => {
    setProps((pre) => {
      const newSizes = [...pre];
      newSizes[index][name] = value;
      return newSizes;
    });
  };
  return (
    <div className="mt-2 mb-2 ">
      <Button
        type="button"
        onClick={addProp}
        variant="outline"
        className="gap-x-2 bg-gray-100 text-black w-full"
      >
        <PlusCircle size={20}></PlusCircle> {label}
      </Button>
      {props.length > 0 && (
        <div className="border px-2  rounded-lg mt-3">
          {props.length > 0 &&
            props.map((size, index) => (
              <div className="flex w-full   mt-3 items-center" key={index}>
                <div className=" w-full  flex gap-2 p-2 ">
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="size"
                      value={size.name}
                      onChange={(e) => editProp(e.target.value, index, "name")}
                    ></input>
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="price"
                      value={size.price}
                      onChange={(e) => editProp(e.target.value, index, "price")}
                    ></input>
                  </div>
                </div>
                <span
                  onClick={() => removeProp(index)}
                  className="w-11 cursor-pointer h-11 rounded-full flex  justify-center items-center"
                >
                  <Trash2 color="red"></Trash2>
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MenuItemPriceProp;
