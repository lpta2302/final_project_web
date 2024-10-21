import Review from "../../models/review.model.js";

const reviewController = {
  // [POST] /client/reviews/:id
  addReviews: async (req, res) => {
    try {
      const review = new Review({
        clientId: req.body.clientId,
        product: req.params.id, // Đảm bảo trường 'product' nhận giá trị từ 'productId'
        description: req.body.description,
        star: req.body.star,
      });

      const isExist = await Review.findOne({
        clientId: req.body.clientId,
        product: req.params.id,
      });

      if (isExist) {
        return false;
      }

      await review.save();

      return res.status(200).json({
        data: review,
      });
    } catch (err) {
      return false;
    }
  },

  // [DELETE] /client/reviews/:id
  delReviews: async (req, res) => {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);

      res.status(200).json({
        data: review,
      });
    } catch (err) {
      return false;
    }
  },

  // [PATCH] /client/reviews/:id
  updateReviews: async (req, res) => {
    try {
      const allowedUpdates = ["description", "star"];

      const updates = Object.keys(req.body);
      const isValid = updates.every((update) =>
        allowedUpdates.includes(update)
      );

      if (!isValid) {
        return res.status(400).json({ message: fals });
      }

      const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      return res.status(200).json({
        data: review,
      });
    } catch (err) {
      return false;
    }
  },
};

export default reviewController;
