import mongoose from "mongoose";

// Định nghĩa schema cho Tag
const voucherSchema = new mongoose.Schema(
  {
    voucherName: {
      type: String,
      required: true,
    },
    discountPercentage: Number,
    description: String,
    fixedAmount: Number,
    usageLimitPerCustomer: Number,
  },
  {
    timestamps: true,
  }
);

const Voucher = mongoose.model("voucher", voucherSchema, "voucher");

export default Voucher;
