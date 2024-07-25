import ConnectDB from "@app/dbConnect/Connect";
import Category from "@app/models/Category";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const data = await req.json();
  const {name,slug,image}=data
  console.log(data, "check add category data ");

  try {
    await ConnectDB();
    const existingCateory = await Category.findOne({ name});
    if (existingCateory) {
      return NextResponse.json({
        success: false,
        message: "Already exist",
        status: 400,
      });
    }

    await Category.create({ name,slug,image });
    return NextResponse.json({
      success: true,
      message: "Saved",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "server error",
      status: 500,
    });
  }
};
