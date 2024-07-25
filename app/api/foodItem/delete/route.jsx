import FoodItem from "@app/models/FoodItem";import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const DELETE = async (req, res) => {
  const data = await req.json();
  console.log(data, "chekc data ");
  try {
    const deletedata = await FoodItem.findByIdAndDelete(data._id);
    if (deletedata) {
      await revalidateTag("foodItems");

      return NextResponse.json({
        success: true,
        message: "Deleted",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "failed",
    });
  }
};
