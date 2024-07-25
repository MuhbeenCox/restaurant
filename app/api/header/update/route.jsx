import Header from "@app/models/Header";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
  try {
    const data = await req.json();
    const { _id } = data;

    const updateHeader = await Header.findByIdAndUpdate(_id, data);

    return NextResponse.json({
      success: true,
      message: "Updated",
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
