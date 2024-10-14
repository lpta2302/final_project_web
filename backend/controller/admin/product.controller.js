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

// [PATCH] /products/editProduct
export const editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    console.log(req.body);

    await Product.updateOne({ _id: id }, req.body);

    res.json({
      code: 200,
      message: "Sửa sản phẩm thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Sửa sản phẩm thất bại",
    });
  }
};

// [DELETE] /products/deleteProduct
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    await Product.deleteOne({ _id: id });

    res.json({
      code: 200,
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Xóa sản phẩm thất bại",
    });
  }
};

// [GET] /products/detail/:id
export const detail = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const record = await Product.findOne({ _id: id });

    res.json({
      code: 200,
      record: record,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Đã có lỗi xảy ra",
    });
  }
};
