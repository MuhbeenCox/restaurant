import { authOptions, isAdmin } from "@app/api/auth/[...nextauth]/route";

import ConnectDB from "@app/dbConnect/Connect";
import Order from "@app/models/Order";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await ConnectDB();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user.email;
    const admin = await isAdmin();
    if (admin) {
      const orders = await Order.find();
      return NextResponse.json({
        success: true,
        orders,
        status: 200,
      });
    } else {
      const orders = await Order.find({ email: userEmail });
      return NextResponse.json({
        success: true,
        orders,
        status: 200,
      });
    }
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      status: 500,
    });
  }
};
