import product from "../models/productModel.js";

const productController = {
  addProduct: async (req, res) => {
    try {
      const newProduct = new product(req.body);
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default productController;
