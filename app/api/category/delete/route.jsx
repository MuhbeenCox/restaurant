import ConnectDB from "@app/dbConnect/Connect";
import Category from "@app/models/Category";
import { NextResponse } from "next/server";

export const DELETE = async (req, res) => {
  try {
    await ConnectDB();
    const _id = await req.json();
    console.log(_id, "category delete id 1122 ");

    const deleteCategory = await Category.deleteOne({ _id });

    if (deleteCategory) {
      return NextResponse.json({
        success: true,
        message: "Deleted!",
        status: 200,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed",
        status: 404,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "server error",
      status: 500,
    });
  }
};
