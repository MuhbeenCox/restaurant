import { authOptions } from "@app/api/auth/[...nextauth]/route";
import ConnectDB from "@app/dbConnect/Connect"
import WishList from "@app/models/WishList";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const DELETE = async (req, res) => {
    const {_id} = await req.json();
  const {productId}=_id;
console.log(productId,"check deleted wishlist id 22 ")
    try {
        await ConnectDB();
        const session = await getServerSession(authOptions);
        const userEmail = session?.user.email;
        let wishList = await WishList.findOne({ userEmail });
        console.log(wishList.foodItems,"check wish foodItems")

        if (wishList) {
        wishList.foodItems=  wishList.foodItems.filter((item) =>  item._id.toString() !== productId);

            console.log(wishList,"check wish deleted11")
            await wishList.save();
            return NextResponse.json({ success: true, message: "removed", wishList })
        }
        else {
            return NextResponse.json({ success: false, message: "Wishlist not found" });
        }


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false, message: error.message,
        })
    }

}