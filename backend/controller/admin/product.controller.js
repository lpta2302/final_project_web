import Product from "../../models/product.model.js";

// [GET] /products
export const index = async (req, res) => {
  const product = await Product.find({});
  console.log(product);

  res.json(product);
};
