import ConnectDB from "@app/dbConnect/Connect";
import FoodItem from "@app/models/FoodItem";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
export const POST = async (req, res) => {
  const data = await req.json();
  console.log(data, "check food data ");
  try {
    await ConnectDB();
    await FoodItem.create(data);
    await revalidateTag("foodItems");

    return NextResponse.json({
      message: "Saved",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed",
      success: false,
    });
  }
};
