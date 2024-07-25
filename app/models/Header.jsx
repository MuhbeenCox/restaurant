import mongoose from "mongoose";

const headerSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }], // Array of image URLs
  },
  { timestamps: true }
);

const Header = mongoose.models.Header || mongoose.model("Header", headerSchema);

export default Header;
