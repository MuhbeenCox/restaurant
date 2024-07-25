import ConnectDB from "@app/dbConnect/Connect";
import User from "@app/models/User";
import UserInfo from "@app/models/UserInfo";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Step 1: Connect to the database
    await ConnectDB();

    const usersInfo = await UserInfo.find().lean();
    if (usersInfo) {
      return NextResponse.json({ data: usersInfo });
    }
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
};
