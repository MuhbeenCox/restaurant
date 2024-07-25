import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    city: { type: String },
    address: { type: String },
    phone: { type: String },
    postal: { type: String },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserInfo =
  mongoose.models.UserInfo || mongoose.model("UserInfo", userInfoSchema);

export default UserInfo;
