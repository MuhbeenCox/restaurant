import { authOptions } from "@app/api/auth/[...nextauth]/route";
import ConnectDB from "@app/dbConnect/Connect";
import FoodItem from "@app/models/FoodItem";
import Review from "@app/models/Review";
import User from "@app/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const { foodId, comment, rating } = await req.json();

  try {
    await ConnectDB();

    const session = await getServerSession(authOptions);
    const userEmail = session?.user.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({
        message: "User not authenticatd",
        status: 400,
      });
    }

    let review = await Review.create({ user: user._id, comment, rating });

    await FoodItem.findByIdAndUpdate(foodId, {
      $push: { reviews: review._id },
    });

    review = await Review.findById(review._id).populate(
      "user",
      "name email image"
    );

    return NextResponse.json({
      message: "submited",
      success: true,
      status: 200,
      review,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "Something wrong",
      success: false,
      status: 500,
    });
  }
};
