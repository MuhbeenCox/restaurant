import FoodItem from "@app/models/FoodItem";import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const PUT = async (req, res) => {
  const { _id, ...data } = await req.json();


  try {
    const updateData = await FoodItem.findByIdAndUpdate({ _id }, data);
    if (updateData) {
       await revalidateTag("foodItems");
      return NextResponse.json({
        success: true,
        message: "Updated",
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
