import ConnectDB from "@app/dbConnect/Connect";
import FoodItem from "@app/models/FoodItem";
import Review from "@app/models/Review";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const id = params.id;

  try {
    await ConnectDB();
    const foodItem = await FoodItem.findById({ _id: id }).populate({ path: "reviews", populate: { path: "user", select: "name email image" } });
    if (foodItem) {
      return NextResponse.json({
        success: true,
        data: foodItem,
      });
      
    } else {
      return NextResponse.json({
        success: false,
        message: "Not Found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
