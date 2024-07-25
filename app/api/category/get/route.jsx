import ConnectDB from "@app/dbConnect/Connect";
import Category from "@app/models/Category";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await ConnectDB();
    const categories = await Category.find();

    if (categories) {
      return NextResponse.json({
        data: categories,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Not Found",
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "sever error ",
    });
  }
};
