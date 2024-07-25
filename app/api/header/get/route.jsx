import ConnectDB from "@app/dbConnect/Connect";
import Header from "@app/models/Header";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await ConnectDB();
    const header = await Header.find({});
    return NextResponse.json({
      success: true,
      header,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      status: 500,
    });
  }
};
