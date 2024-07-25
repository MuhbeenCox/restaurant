import ConnectDB from "@app/dbConnect/Connect";
import Category from "@app/models/Category";
import FoodItem from "@app/models/FoodItem";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await ConnectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let filterr;
    if (category) {
      const getCategory = await Category.findOne({ slug: category });
      filterr = { category: getCategory.name };
    } else {
      filterr = {};
    }

    const foodItems = await FoodItem.find(filterr);

    if (foodItems.length > 0) {
      return new NextResponse(
        JSON.stringify({
          success: true,
          data: foodItems,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
            "Surrogate-Control": "no-store",
          },
        }
      );
    } else {
      console.log("No food items found.");
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Not Found",
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
            "Surrogate-Control": "no-store",
          },
        }
      );
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Server Error",
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
          "Surrogate-Control": "no-store",
        },
      }
    );
  }
};
