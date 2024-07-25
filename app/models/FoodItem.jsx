import mongoose from "mongoose";
import { stringify } from "postcss";

const ExtraPriceSchema = new mongoose.Schema({
  name: String,
  price: String,
});

const foodItemSchema = new mongoose.Schema(
  {
    name: { type: String },
    basePrice: { type: String },
    description: { type: String },
    image: { type: String },
    category: { type: String },
    discount: { type: String },
    featured: { type: Boolean, default: false },
    sizes: { type: [ExtraPriceSchema] },
    extraIngredientPrices: { type: [ExtraPriceSchema] },
    available: { type: Boolean, default: true },
    reviews: [ {type:mongoose.Schema.Types.ObjectId, ref: "Review" }]
  },
  { timestamps: true }
);

const FoodItem =
  mongoose.models.FoodItem || mongoose.model("FoodItem", foodItemSchema);

export default FoodItem;
