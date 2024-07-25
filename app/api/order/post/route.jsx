import { authOptions } from "@app/api/auth/[...nextauth]/route";
import ConnectDB from "@app/dbConnect/Connect";
import Order from "@app/models/Order";
import sendOrderConfirmationEmail from "@utils/sendOrderConfirmationEmail";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req, res) => {
  try {
    const data = await req.json();

    await ConnectDB();

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (data) {
      let paid = false;

      if (data?.paymentScreenshot) {
        paid = true;
      }

      let order_id = data.orderId;

      const existingOrderId = await Order.findOne({ orderId: order_id });

      if (existingOrderId) {
        order_id = order_id - 4;
      }

      const orderData = {
        ...data,
        paid,
        email,
        orderId: order_id,
      };

      const order = await Order.create(orderData);
      if (order) {
        await sendOrderConfirmationEmail(email, order);
      }

      return NextResponse.json({
        message: "Order Confirmed",
        success: true,
        order,
      });
    }

    return NextResponse.json({
      success: false,
      message: "Please Add Food",
    });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      {
        message: "Order failed",
        success: false,
      },
      { status: 500 }
    );
  }
};
