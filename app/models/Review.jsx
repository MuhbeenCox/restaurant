import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId,ref:"User" },
       comment:{type:String},
       rating:{type:Number, enum:[1,2,3,4,5]}
    },
    { timestamps: true }
);

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
