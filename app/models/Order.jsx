import mongoose from "mongoose";

const CartProductSchema = new mongoose.Schema(
  {
    productId: { type: String },
    name: { type: String },
    image: { type: String },
    category: { type: String },
    sizes: { type: String },
    extraIngredientPrices: [{ name: { type: String } }],
    quantity: { type: String },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String },
    isNewOrder: { type: Boolean, default: true },
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    postal: { type: String, required: true },
    cartProducts: { type: [CartProductSchema], required: true },
    totalPrice: { type: String },
    status: {
      type: String,
      enum: ["making", "on way", "delivered"],
    },
    paid: { type: Boolean, default: false },
    paymentScreenshot: { type: String },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
