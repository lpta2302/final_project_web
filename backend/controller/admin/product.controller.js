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

    const exitProductCode = await Product.findOne({
      productCode: req.body.productCode,
    });

    if (exitProductCode) {
      res.json({
        code: 400,
        message: "Mã sản phẩm đã tồn tại",
      });
      return;
    }

    await record.save();

    res.json({
      code: 200,
      message: "Tạo sản phẩm thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Tên sản phẩm đã tồn tại",
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

// [GET] /products/search
export const search = async (req, res) => {
  try {
    const record = await Product.find({});

    res.json({
      record: record,
      code: 200,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Đã có lỗi xảy ra",
    });
  }
};
