import { authOptions } from "@app/api/auth/[...nextauth]/route";
import ConnectDB from "@app/dbConnect/Connect"
import FoodItem from "@app/models/FoodItem";
import WishList from "@app/models/WishList";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await ConnectDB();

        const session = await getServerSession(authOptions);
        const userEmail = session?.user.email;

        if (!userEmail) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        const wishList = await WishList.findOne({ userEmail }).populate("foodItems");
        return NextResponse.json(wishList)

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Server error"
        });
    }
}