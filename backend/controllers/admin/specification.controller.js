import Spec from "../../models/specification.model.js";
import Product from "../../models/product.model.js";
import specsKey from "../../models/specsKey.model.js";

const specController = {
  // [GET] /spec
  showSpec: async (req, res) => {
    try {
      const specsList = await Spec.find();

      const populatedSpecsList = await Promise.all(
        specsList.map(async (spec) => {
          const populatedSpecifications = await Promise.all(
            spec.specifications.map(async (item) => {
              // Fetch the SpecificationKey by ID in 'key'
              const specificationKey = await specsKey.findById(item.key);
              return {
                key: specificationKey,  // replace key ID with full specificationKey document
                value: item.value,
              };
            })
          );
          return { ...spec.toObject(), specifications: populatedSpecifications };
        })
      );

      res.status(200).json(populatedSpecsList);
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

      // Kiểm tra nếu mã Specification đã tồn tại
      const specExist = await Spec.findOne({ specCode: specCode });
      if (specExist) {
        return res.status(400).json(false);
      }

      // Kiểm tra từng key của specifications nếu có (không yêu cầu tất cả phải tồn tại)
      const validSpecs = await Promise.all(
        specifications.map(async (spec) => {
          // Kiểm tra key có trong SpecificationKey không
          const isValidKey = await specsKey.findById(spec.key); // Sửa lại từ `_id` thành `key`
          return isValidKey ? { key: spec.key, value: spec.value } : null; // Chỉ giữ các specifications hợp lệ
        })
      );

      // Lọc các specifications hợp lệ
      const filteredSpecs = validSpecs.filter((spec) => spec !== null);

      // Tạo mới Specification với các specifications hợp lệ
      const newSpec = new Spec({
        specCode,
        specifications: filteredSpecs,
        stockQuantity,
        price,
        products,
      });

      await newSpec.save();

      // Cập nhật Product với Specification mới
      const productOrigin = await Product.findById(products);
      if (productOrigin) {
        await productOrigin.updateOne({ $push: { specs: newSpec._id } });
      }

      res.status(200).json(newSpec);
    } catch (err) {
      res.status(500).json({ message: false });
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

  // [GET] /specification-keys
  showSpecKey: async (req, res) => {
    try {
      const _specKey = await specsKey.find();

      if (!_specKey || _specKey.length === 0) {
        res.status(400).json(false);
      }

      res.status(200).json(_specKey);
    } catch (err) {
      res.status(500).json(false);
    }
  },

  // [POST] /specification-keys
  addSpecKey: async (req, res) => {
    try {
      // Nếu chỉ có một đối tượng thì chuyển thành mảng chứa một phần tử
      const keys = Array.isArray(req.body.keys) ? req.body.keys : [req.body];

      // Tìm các khóa đã tồn tại để tránh trùng lặp
      const existingKeys = await specsKey
        .find({ key: { $in: keys.map((k) => k.key) } })
        .select("key");
      const existingKeyNames = existingKeys.map((key) => key.key);

      // Lọc ra các khóa chưa tồn tại
      const newKeys = keys.filter((k) => !existingKeyNames.includes(k.key));

      // Tạo các bản ghi specsKey mới
      const specKeyInstances = newKeys.map((k) => new specsKey({ key: k.key }));

      // Thêm các khóa mới vào cơ sở dữ liệu
      if (specKeyInstances.length > 0) {
        await specsKey.insertMany(specKeyInstances);
      }

      res.status(200).json(specKeyInstances);
    } catch (err) {
      res.status(500).json(false);
    }
  },

  // [DELETE] /specification-keys/:id
  delSpecKey: async (req, res) => {
    try {
      await specsKey.findByIdAndDelete(req.params.id);

      res.status(200).json(true);
    } catch (err) {
      res.status(500).json(false);
    }
  },

  // [PATCH] /specification-keys/:id
  updtSpecKey: async (req, res) => {
    try {
      const result = await specsKey.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(false);
    }
  },
};

export default specController;
