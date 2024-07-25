import { authOptions } from "@app/api/auth/[...nextauth]/route";
import ConnectDB from "@app/dbConnect/Connect";
import User from "@app/models/User";
import UserInfo from "@app/models/UserInfo";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const PUT = async (req, res) => {
  try {
    await ConnectDB();
    const { name, _id, image, ...otherInfo } = await req.json();

    if (_id) {
      const userInfo = await UserInfo.findById(_id);

      if (!userInfo) {
        return NextResponse.json({
          success: false,
          message: "User not found",
          status: 404,
        });
      }

      await User.updateOne({ email: userInfo.email }, { name, image });
      await UserInfo.findByIdAndUpdate(
        _id,
        { name, ...otherInfo },
        { upsert: true }
      );

      return NextResponse.json({
        success: true,
        message: "Updated!",
        status: 200,
      });
    } else {
      const session = await getServerSession(authOptions);
      const loginUserEmail = session.user?.email;

      if (!loginUserEmail) {
        return NextResponse.json({
          success: false,
          message: "Unauthorized",
          status: 401,
        });
      }

      const user = await User.findOne({ email: loginUserEmail });
      if (!user) {
        return NextResponse.json({
          success: false,
          message: "User not found",
          status: 404,
        });
      }

      await User.updateOne({ email: user.email }, { name, image });
      await UserInfo.findOneAndUpdate(
        { email: user.email },
        { name, ...otherInfo },
        { upsert: true }
      );

      return NextResponse.json({
        success: true,
        message: "Saved!",
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Update error",
      error: error.message,
    });
  }
};
