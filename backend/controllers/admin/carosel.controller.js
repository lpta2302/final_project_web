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

      return res.status(200).json({
        data: carousel,
      });
    } catch (err) {
      return res.status(500).json({ message: false });
    }
  },

  // [GET] /carousel/
  showCarousel: async (req, res) => {
    try {
      const carousel = await Carousel.find();

      return res.status(200).json({
        data: carousel,
      });
    } catch (err) {
      return res.status(500).json({ message: false });
    }
  },

  // [DELETE] /carousel/:id
  delCarousel: async (req, res) => {
    try {
      const carousel = await Carousel.findByIdAndDelete(req.params.id);

      return res.status(200).json({
        data: carousel,
      });
    } catch (err) {
      return res.status(500).json({ message: false });
    }
  },

  // [PATCH] /carousel/:id
  updateCarousel: async (req, res) => {
    try {
      const carousel = await Carousel.updateOne(
        { _id: req.params.id },
        req.body
      );

      return res.status(200).json({
        data: carousel,
      });
    } catch (err) {
      return res.status(500).json({ message: false });
    }
  },
};

export default carouselController;
