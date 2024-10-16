import Brand from "../../models/brand.model.js";
import Product from "../../models/product.model.js";

const brandController = {
  // [GET] /brand/
  showBrand: async (req, res) => {
    try {
      const brands = await Brand.find();
      res.status(200).json({
        code: 200,
        message: "Hiển thị tất cả các brand thành công.",
        data: brands,
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Quá trình hiển thị thông tin gặp lỗi. Vui lòng thử lại",
        error: err.message,
      });
    }
  },

  // [POST] /brand
  addBrand: async (req, res) => {
    try {
      const _brand = new Brand(req.body);
      const id = await Brand.findById(_brand._id);

      if (id) {
        return res.status(400).json({
          code: 400,
          message: "Brand đã tồn tại. Vui lòng thêm brand mới.",
        });
      }

      await _brand.save();

      res.status(200).json({
        code: 200,
        message: "Tạo brand mới thành công.",
        data: _brand,
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Quá trình thêm brand gặp lỗi. Vui lòng thử lại",
        error: err.message,
      });
    }
  },

  // [GET] /brand/:id
  showProductsBrand: async (req, res) => {
    try {
      const products = await Brand.findById(req.params.id).populate("products");

      res.status(200).json({
        code: 200,
        message: "Hiển thị danh sách các sản phẩm trong brand thành công.",
        data: products,
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Quá trình hiển thị gặp lỗi. Vui lòng thử lại.",
        error: err.message,
      });
    }
  },

  // [DELETE] /brand/del
  delBrand: async (req, res) => {
    try {
      await Product.updateMany(
        { brand: req.params.id },
        { $unset: { brand: "" } }
      );

      await Brand.findByIdAndDelete(req.params.id);

      res.status(200).json({
        code: 200,
        message: "Xóa brand thành công.",
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Xóa brand gặp lỗi. Vui lòng hãy thử lại.",
        error: err.message,
      });
    }
  },

  // [PATCH] /brand/
  updateBrand: async (req, res) => {
    try {
      const updateBrand = await Brand.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );

      res.status(200).json({
        code: 200,
        message: "Cập nhật brand thành công.",
        data: updateBrand,
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Quá trình cập nhật diễn ra thất bại. Vui lòng thử lại",
        error: err.message,
      });
    }
  },

  // [GET] /brand/search
  searchBrand: async (req, res) => {
    try {
      // Lấy từ khóa tìm kiếm (nếu không có thì mặc định là chuỗi rỗng)
      const search = req.query.search || "";

      // Điều kiện lọc và sắp xếp
      let sort = req.query.sort || "brandName"; // Mặc định sắp xếp theo tên thương hiệu (brandName)

      // Cấu trúc dữ liệu sắp xếp (tăng dần hoặc giảm dần)
      req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

      let sortBy = {};
      if (sort[1]) {
        sortBy[sort[0]] = sort[1];
      } else {
        sortBy[sort[0]] = "asc"; // Mặc định sắp xếp tăng dần
      }

      // Tìm kiếm trong brandCode và brandName
      const brands = await Brand.find({
        $or: [
          { brandCode: { $regex: search, $options: "i" } },
          { brandName: { $regex: search, $options: "i" } },
        ],
      }).sort(sortBy);

      // Trả về kết quả tìm kiếm
      res.status(200).json({
        code: 200,
        message: "Tìm kiếm thành công",
        data: brands, // Trả về danh sách thương hiệu tìm được
      });
    } catch (err) {
      // Xử lý lỗi
      res.status(500).json({
        code: 500,
        message: "Quá trình tìm kiếm thương hiệu bị lỗi. Vui lòng thử lại.",
        error: err.message,
      });
    }
  },
};

export default brandController;
