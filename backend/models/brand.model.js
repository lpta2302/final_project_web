import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const brandSchema = new mongoose.Schema(
  {
    brandCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const _Brand = mongoose.models.Brand || mongoose.model("Brand", brandSchema);
export default _Brand;
