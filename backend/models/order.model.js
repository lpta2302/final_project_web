import mongoose from "mongoose";

const orderScheme = new mongoose.Schema(
  {
    userId: String,
    processStatus: {
      type: String,
      enum: ["pending", "completed", "canceled"],
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "bank_transfer"],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    orderNote: {
      type: String,
      trim: true,
    },
    expectedReceiveTime: {
      type: Date,
    },
    receiveTime: {
      type: Date,
    },
    takeOrderTime: {
      type: Date,
    },
    payTime: {
      type: Date,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    voucher: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Voucher",
      },
    ],
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderScheme);
export default Order;
