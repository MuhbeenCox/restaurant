import ConnectDB from "@app/dbConnect/Connect";
import Category from "@app/models/Category";
import { NextResponse } from "next/server";

export const PUT = async (req, res) => {
  try {
    await ConnectDB();
    const data = await req.json();

    const {id,name,slug,image}=data;
    console.log(name, id, "category update 1122  ");

    if (!id || !name || !slug) {
      return NextResponse.json({
        success: false,
        message: "Invalid data",
        status: 400,
      });
    }

    const updatedCategory = await Category.updateOne({ _id:id }, { name,slug,image });

    if (updatedCategory) {
      return NextResponse.json({
        success: true,
        message: "Saved!",
        status: 200,
        data: updatedCategory,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Category not found",
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
