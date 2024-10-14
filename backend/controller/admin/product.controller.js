import Product from "../../models/product.model.js";

// [GET] /products
export const index = async (req, res) => {
  const product = await Product.find({});

  res.json(product);
};

// [POST] /products/postProduct
export const postProduct = async (req, res) => {
  try {
    const record = new Product(req.body);

    await record.save();

    res.json({
      code: 200,
      message: "Tạo sản phẩm thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Tạo sản phẩm thất bại",
    });
  }
};
