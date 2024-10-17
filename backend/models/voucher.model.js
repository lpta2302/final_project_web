import mongoose from "mongoose";

// Định nghĩa schema cho voucher
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
    clients: [
      {
        clientId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "account",
        },
        usageLimitPerCustomer: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Voucher = mongoose.model("voucher", voucherSchema, "voucher");

export default Voucher;
