import { authOptions } from "@app/api/auth/[...nextauth]/route";
import ConnectDB from "@app/dbConnect/Connect";
import FoodItem from "@app/models/FoodItem";
import WishList from "@app/models/WishList";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    try {
        const { productId } = await req.json();
        console.log(productId, "check id ");
        await ConnectDB();
        const session = await getServerSession(authOptions);
        const userEmail = session?.user.email;
        if (!userEmail) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        let wishList = await WishList.findOne({ userEmail });
        if (!wishList) {
            wishList = new WishList({ userEmail, foodItems: [productId] });
        }

        else {
            if (wishList.foodItems.includes(productId)) {
                return NextResponse.json({
                    message: "aleady in Wishlist"
                }, { status: 400 })
            }

            await wishList.foodItems.push(productId);


        }
        await wishList.save();

      
        wishList = await wishList.populate('foodItems');

        return NextResponse.json({success:true,message:"Added to wishlist",wishList});
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "server error"
        })

    }
}