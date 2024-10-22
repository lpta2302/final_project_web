import Product from "../../models/product.model.js";
import Brand from "../../models/brand.model.js";

// [GET] /products
export const index = async (req, res) => {
  const product = await Product.find({});

  res.status(200).json(product);
};

// [POST] /products/postProduct
export const postProduct = async (req, res) => {
  try {
    // Kiểm tra nếu productCode đã tồn tại
    const existingProductCode = await Product.findOne({
      productCode: req.body.productCode,
    });

    if (exitProductCode) {
      return res.status(400).json(false);
    }

    // Kiểm tra nếu productName đã tồn tại
    const existingProductName = await Product.findOne({
      productName: req.body.productName,
    });

    if (existingProductName) {
      return res.status(400).json({
        code: 400,
        message: "Tên sản phẩm đã tồn tại",
      });
    }

    // Tạo sản phẩm mới
    const record = new Product(req.body);
    const savedProduct = await record.save();

    // Thêm sản phẩm vào danh sách sản phẩm của thương hiệu
    const brand = await Brand.findById(req.body.brand);
    await brand.updateOne({ $push: { products: savedProduct._id } });

    res.status(200).json(savedProduct);
  } catch (error) {
    return res.status(400).json(false);
  }
};

// [PATCH] /products/editProduct
export const editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    console.log(req.body);

    await Product.updateOne({ _id: id }, req.body);

    res.status(200).json(req.body);
  } catch (error) {
    res.status(400).json({
      message: false,
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

    const product = await Product.findByIdAndDelete(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      message: false,
    });
  }
};

// [GET] /products/detail/:id
export const detail = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const record = await Product.findOne({ _id: id });

    res.status(200).json(record);
  } catch (error) {
    res.status(400).json({
      message: false,
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
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: false });
  }
};
