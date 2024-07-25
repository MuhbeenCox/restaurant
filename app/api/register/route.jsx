import ConnectDB from "@/app/dbConnect/Connect";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import UserInfo from "@app/models/UserInfo";

export const POST = async (req, res) => {
  const { username, email, password } = await req.json();
  try {
    ConnectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User aleardy exists!",
        status: 400,
      });
    }

    const hashPassword = await bcrypt.hash(password, 8);
    console.log(hashPassword);
    const createUser = await User.create({
      name: username,
      email,
      password: hashPassword,
    });

    await UserInfo.create({ name: username, email });

    if (createUser) {
      return NextResponse.json({
        success: true,
        message: "User save successfully",
        status: 200,
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
