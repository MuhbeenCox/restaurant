import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
    {
        userEmail: { type: String, required: true },
        foodItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "FoodItem"
            }
        ]
    },
    { timestamps: true }
);

const WishList = mongoose.models.WishList || mongoose.model("WishList", wishlistSchema);

export default WishList;
