import mongoose from "mongoose";

// Định nghĩa schema cho discount
const discountSchema = new mongoose.Schema(
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
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Tạo model Category từ schema
const Discount = mongoose.model("discount", discountSchema);

export default Discount;
