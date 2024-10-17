import Product from "../../models/product.model.js";
import Brand from "../../models/brand.model.js";

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

    const savedProduct = await record.save();
    const brand = await Brand.findById(req.body.brand);
    await brand.updateOne({ $push: { products: savedProduct._id } });

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
    await Brand.updateOne(
      { products: req.params.id },
      { $pull: { products: req.params.id } }
    );

    await Product.findByIdAndDelete(req.params.id);

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
    const { productName, minPrice, maxPrice, productStatus } = req.query;

    let filter = {};

    // Nếu có tên sản phẩm, sử dụng regex để tìm kiếm gần đúng (không phân biệt hoa thường)
    if (productName) {
      filter.productName = { $regex: productName, $options: "i" };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) {
        filter.price.$gte = Number(minPrice);
        // Lớn hơn hoặc bằng regex
      }
      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
        // Bé hơn hoặc bằng regex
      }
    }

    // Nếu có lọc trạng thái sản phẩm
    if (productStatus) {
      filter.productStatus = productStatus;
    }

    // Truy vấn sản phẩm dựa trên điều kiện lọc
    const products = await Product.find(filter);

    // Trả về danh sách sản phẩm
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra", error });
  }
};