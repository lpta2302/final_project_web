import Carousel from "../../models/carousel.model.js";

const carouselController = {
  // [POST] /carousel/
  addCarousel: async (req, res) => {
    try {
      const _slug = req.body.slug;

      const isExist = await Carousel.findOne({ _slug });

      if (isExist) {
        return false;
      }

      const carousel = await Carousel(req.body);
      await carousel.save();

      return res.status(200).json(carousel);
    } catch (err) {
      return res.status(500).json(false);
    }
  },

  // [GET] /carousel/
  showCarousel: async (req, res) => {
    try {
      const carousel = await Carousel.find();

      return res.status(200).json(carousel);
    } catch (err) {
      return res.status(500).json(false);
    }
  },

  // [DELETE] /carousel/:id
  delCarousel: async (req, res) => {
    try {
      const carousel = await Carousel.findByIdAndDelete(req.params.id);

      return res.status(200).json(true);
    } catch (err) {
      return res.status(500).json(false);
    }
  },

  // [PATCH] /carousel/:id
  updateCarousel: async (req, res) => {
    try {
      const carousel = await Carousel.findOneAndUpdate(
        { _id: req.params.id }, // Điều kiện tìm kiếm
        req.body,
        { new: true } // Trả về document đã được cập nhật
      );

      return res.status(200).json(carousel);
    } catch (err) {
      return res.status(500).json(false);
    }
  },
};

export default carouselController;
