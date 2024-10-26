import Spec from "../../models/specification.model.js";
import Product from "../../models/product.model.js";

const specController = {
  // [GET] /spec
  showSpec: async (req, res) => {
    try {
      const specsList = await Spec.find();
      res.status(200).json(specsList);
    } catch (err) {
      // Xử lý lỗi
      res.status(500).json(false);
    }
  },

  // [POST] /spec
  addSpec: async (req, res) => {
    try {
      // Lấy dữ liệu từ request body
      const { specCode, specifications, stockQuantity, price, products } =
        req.body;
      const specExist = await Spec.findOne({ specCode: specCode });

      if (specExist) {
        return res.status(400).json(false);
      }

      const newSpec = new Spec({
        specCode,
        specifications, // Map thông số kỹ thuật
        stockQuantity,
        price,
        products, // Danh sách ObjectId của sản phẩm
      });

      await newSpec.save();
      const productOrigin = await Product.findById(products);
      await productOrigin.updateOne({ $push: { specs: newSpec._id } });

      res.status(200).json(newSpec);
    } catch (err) {
      res.json({ message: false });
    }
  },

  // [DELETE] /spec/:specId
  delSpec: async (req, res) => {
    try {
      await Product.updateOne(
        { specs: req.params.specId }, // Tìm
        { $pull: { specs: req.params.specId } } // Lấy ra khỏi array
      );
      const spec = await Spec.findByIdAndDelete(req.params.specId);

      res.status(200).json(true);
    } catch (err) {
      res.status(500).json(false);
    }
  },

  // [PATCH] /spec
  updateSpec: async (req, res) => {
    try {
      const result = await Spec.findOneAndUpdate(
        { _id: req.params.specId },
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(false);
    }
  },

  // [GET] /spec/search
  searchSpec: async (req, res) => {
    try {
      // Lấy từ khóa tìm kiếm (nếu không có thì mặc định là chuỗi rỗng)
      const search = req.query.search || "";

      // Điều kiện lọc và sắp xếp
      let sort = req.query.sort || "specCode"; // Mặc định sắp xếp theo mã thông số kỹ thuật (specCode)
      let stockRange = req.query.stockRange || "All"; // Phạm vi số lượng tồn kho
      let priceRange = req.query.priceRange || "All"; // Phạm vi giá

      // Cấu trúc dữ liệu sắp xếp (tăng dần hoặc giảm dần)
      req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

      let sortBy = {};
      if (sort[1]) {
        sortBy[sort[0]] = sort[1];
      } else {
        sortBy[sort[0]] = "asc"; // Mặc định sắp xếp tăng dần
      }

      // Điều kiện lọc cho số lượng tồn kho (nếu có phạm vi cụ thể)
      let stockQuery = {};
      if (stockRange !== "All") {
        const [minStock, maxStock] = stockRange.split("-");
        stockQuery = {
          stockQuantity: { $gte: parseInt(minStock), $lte: parseInt(maxStock) },
        };
      }

      // Điều kiện lọc cho giá (nếu có phạm vi cụ thể)
      let priceQuery = {};
      if (priceRange !== "All") {
        const [minPrice, maxPrice] = priceRange.split("-").map(Number);
        priceQuery = {
          price: {
            $gte: minPrice,
            $lte: maxPrice,
          },
        };
      }

      // Tìm kiếm trong specCode hoặc kiểm tra specifications tồn tại
      const _specifications = await Spec.find({
        $or: [
          { specCode: { $regex: search, $options: "i" } },
          {
            specifications: {
              $exists: true,
              $ne: null,
            },
          },
        ],
        ...stockQuery,
        ...priceQuery,
      }).sort(sortBy);

      // Lọc kết quả sau khi tìm kiếm
      const filteredSpecifications = _specifications.filter((spec) => {
        const specsMap = spec.specifications; // Trường Map
        return Array.from(specsMap).some(([key, value]) => {
          return (
            key.toLowerCase().includes(search.toLowerCase()) ||
            value.toLowerCase().includes(search.toLowerCase())
          );
        });
      });

      // Trả về kết quả tìm kiếm
      res.status(200).json(filteredSpecifications);
    } catch (err) {
      // Xử lý lỗi
      res.status(500).json(false);
    }
  },
};

export default specController;
