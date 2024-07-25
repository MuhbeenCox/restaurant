import ConnectDB from "@app/dbConnect/Connect";
import Order from "@app/models/Order";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const url = new URL(req.url);

    const id = url.pathname.split("/").pop();
    console.log(id, "check url");

    await ConnectDB();

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json({
        status: 404,
        message: "Order not found",
      });
    }

    return NextResponse.json({
      status: 200,
      order,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
