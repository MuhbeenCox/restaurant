import ConnectDB from "@app/dbConnect/Connect";
import User from "@app/models/User";
import UserInfo from "@app/models/UserInfo";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const id = params.id;
  try {
    await ConnectDB();
    const userInfo = await UserInfo.findById(id).lean();

    const user = await User.findOne({ email: userInfo?.email }).lean();
    return NextResponse.json({ ...user, ...userInfo });
  } catch (err) {
    return NextResponse.json({ message: "sever error!" }, { status: 500 });
  }
};
