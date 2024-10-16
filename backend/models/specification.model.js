import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const specificationSchema = new mongoose.Schema(
  {
    specCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    specifications: {
      type: Map,
      of: String, // Bạn có thể thay đổi 'String' thành kiểu giá trị phù hợp nếu các giá trị của map không phải là string.
    },
    stockQuantity: {
      type: Number,
      required: true,
    },
    price: {
      type: mongoose.Types.Decimal128, // Được sử dụng để đại diện cho số thập phân trong MongoDB
      required: true,
    },
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product", // Liên kết tới schema "product"
    },
    discountPercentage: Number,
  },
  {
    timestamps: true,
  }
);

const _Spec =
  mongoose.models.Specification ||
  mongoose.model("Specification", specificationSchema);
export default _Spec;
