import Product from "../../models/product.model.js";

const productController = {
  // [GET] /client/product
  showProduct: async (req, res) => {
    try {
      const products = await Product.find();

      res.status(200).json({
        code: 200,
        message: "Hiển thị sản phẩm thành công.",
        data: products,
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Quá trình hiển thị sản phẩm gặp lỗi. Vui lòng thử lại sau.",
        error: err.message,
      });
    }
  },

  // [GET] client/product/details
  showDetailsProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const specs = await Product.findById(productId).populate("specs");

      res.status(200).json({
        code: 200,
        message: "Hiển thị các chi tiết sản phẩm thành công.",
        data: specs,
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Quá trình hiển thị sản phẩm gặp lỗi. Vui lòng thử lại sau.",
        error: err.message,
      });
    }
  },

  // [GET] client/product/search
  searchProduct: async (req, res) => {
    try {
      // Lấy từ khóa tìm kiếm (nếu không có thì mặc định là chuỗi rỗng)
      const search = req.query.search || "";

      // Điều kiện lọc và sắp xếp
      let sort = req.query.sort || "productName"; // Mặc định sắp xếp theo tên sản phẩm (productName)

      // Cấu trúc dữ liệu sắp xếp (tăng dần hoặc giảm dần)
      req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

      let sortBy = {};
      if (sort[1]) {
        sortBy[sort[0]] = sort[1];
      } else {
        sortBy[sort[0]] = "asc"; // Mặc định sắp xếp tăng dần
      }

      // Tìm kiếm trong productCode, productName và description
      const products = await Product.find({
        $or: [
          { productCode: { $regex: search, $options: "i" } },
          { productName: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } }, // Tìm kiếm thêm theo description
        ],
      }).sort(sortBy);

      // Trả về kết quả tìm kiếm
      res.status(200).json({
        code: 200,
        message: "Tìm kiếm sản phẩm thành công",
        data: products, // Trả về danh sách sản phẩm tìm được
      });
    } catch (err) {
      // Xử lý lỗi
      res.status(500).json({
        code: 500,
        message: "Quá trình tìm kiếm sản phẩm bị lỗi. Vui lòng thử lại.",
        error: err.message,
      });
    }
  },

  // [GET] client/tag/search
  searchTag: async (req, res) => {
    try {
      const { tagId } = req.params;
      const products = await Product.find({
        tag: tagId,
      });

      res.status(200).json({
        code: 200,
        message: "Tìm kiếm sản phẩm thành công",
        data: products, // Trả về danh sách sản phẩm tìm được
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Quá trình tìm kiếm xảy ra lỗi. Vui lòng thử lại.",
        error: err.message,
      });
    }
  },
};

export default productController;
