import { authOptions } from "@app/api/auth/[...nextauth]/route";
import ConnectDB from "@app/dbConnect/Connect";
import User from "@app/models/User";
import UserInfo from "@app/models/UserInfo";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await ConnectDB();

    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }

    const email = session?.user.email;

    const user = await User.findOne({ email }).lean();
    const userInfo = await UserInfo.findOne({ email: user.email }).lean();

    return NextResponse.json({ ...userInfo, ...user });
  } catch (error) {
    console.log(error, "check my error");
    return NextResponse.json({
      success: false,
      message: "get user failed ",
      error: error.message,
    });
  }
};
