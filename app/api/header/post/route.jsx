import ConnectDB from "@app/dbConnect/Connect";
import Header from "@app/models/Header";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const data = await req.json();
    console.log(data, "check header");
    await ConnectDB();

    const header = await Header.create(data);
    if (header) {
      return NextResponse.json({
        success: true,
        message: "save",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.message,
      status: 500,
    });
  }
};
