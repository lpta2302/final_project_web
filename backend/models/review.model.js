const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
    },
    product: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("review", reviewSchema, "reviews");
export default Review;
