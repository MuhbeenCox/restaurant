import Order from "@app/models/Order";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
  try {
    const data = await req.json();
    const { value, _id, isNewOrder } = data;
    if (_id) {
      if (value !== undefined) {
        await Order.findByIdAndUpdate(_id, { status: value });
        return NextResponse.json({
          status: 200,
          success: true,
          message: "Updated",
        });
      }
      if (isNewOrder !== undefined) {
        await Order.findByIdAndUpdate(_id, { isNewOrder });
        return NextResponse.json({
          status: 200,
          message: "checked",
          success: true,
        });
      }
    }

    return NextResponse.json({
      status: 400,
      success: false,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "server error",
      success: false,
      status: 500,
    });
  }
};
