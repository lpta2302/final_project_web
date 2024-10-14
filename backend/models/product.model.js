import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
  {
    productCode: String,
    productName: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stockQuantity: Number,
    productStatus: String,
    imageURLs: {
      type: [String], // Danh sách chứa các URL của hình ảnh
    },
    slug: { type: String, slug: "productName" },
  },
  {
    timestamps: true,
  }
);

// Tạo model Product từ schema
const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;
