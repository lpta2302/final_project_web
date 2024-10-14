import mongoose from "mongoose";

// Định nghĩa schema cho Category
const categorySchema = new mongoose.Schema(
  {
    categoryCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Tạo model Category từ schema
const Category = mongoose.model("category", categorySchema);

export default Category;
