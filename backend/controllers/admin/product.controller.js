import Product from "../../models/product.model.js";
import Brand from "../../models/brand.model.js";
import Category from "../../models/category.model.js";
import SeenProd from "../../models/seen.model.js";
import Specs from "../../models/specification.model.js";
import Tag from "../../models/tag.model.js";
import wishList from "../../models/wishlist.model.js";

// Middleware
import deleteFromDrive from "../../middleware/delToDrive.js";

// [GET] /products
export const index = async (req, res) => {
  const product = await Product.find({}).populate("tag category");

  res.status(200).json(product);
};

// [POST] /products/postProduct
export const postProduct = async (req, res) => {
  try {
    const productCode = req.body.productCode; // Lấy productCode
    const existingProductCode = await Product.findOne({ productCode });
    
console.log(req.body);

    if (existingProductCode) {
      return res.status(400).json(false);
    }

    const productName = req.body.productName; // Lấy productName
    const existingProductName = await Product.findOne({ productName });

    if (existingProductName) {
      return res.status(400).json({
        code: 400,
        message: "Tên sản phẩm đã tồn tại",
      });
    }
    console.log("39");
    
    // Kiểm tra và phân tích các trường JSON
    const tag = req.body.tag ? JSON.parse(req.body.tag) : []; // Phân tích tag, mặc định là mảng rỗng nếu không có
    
    const specs = req.body.specs ? JSON.parse(req.body.specs) : []; // Phân tích specification, mặc định là mảng rỗng nếu không có
console.log(specs);

    // Kiểm tra sự tồn tại của relativeProduct trước khi phân tích
    const relativeProduct = req.body.relativeProduct
      ? JSON.parse(req.body.relativeProduct)
      : []; // Phân tích relativeProduct, mặc định là mảng rỗng
    console.log("48");
    
    // Tạo sản phẩm mới
    const record = new Product({
      productCode,
      productName,
      description: req.body.description,
      price: req.body.price,
      discountPercentage: req.body.discountPercentage,
      stockQuantity: req.body.stockQuantity,
      productStatus: req.body.productStatus,
      imageURLs: req.imageUrls ? req.imageUrls : [],
      category: req.body.category, // Kiểm tra nếu có category
      tag, // Gán tag
      specs,
      brand: req.body.brand, // Gán brand
      relativeProduct, // Gán relativeProduct
      slug: req.body.slug, // Gán slug
    });
    
    console.log(67);
    console.log(record);
    
    
    const savedProduct = await record.save();
console.log(70);

    // Cập nhật thương hiệu
    const brand = await Brand.findById(req.body.brand);
    await brand.updateOne({ $push: { products: savedProduct._id } });
    console.log(75);
    const category = await Category.findById(req.body.category);
    await category.updateOne({ $push: { products: savedProduct._id } });
    console.log(85);
    
    // Cập nhật tag
    if (Array.isArray(tag) && tag.length > 0) {
      for (const tagId of tag) {
        const tag = await Tag.findById(tagId);
        if (tag) {
          await tag.updateOne({ $push: { products: savedProduct._id } });
        }
      }
    }

    res.status(200).json(savedProduct);
  } catch (error) {
    console.log(error);
    
    return res.status(400).json(error);
  }
};

// [PATCH] /products/editProduct
export const editProduct = async (req, res) => {
  try {
    const id = req.params.id;

    // Tìm sản phẩm hiện tại
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newImgUrl = req.imageUrls || [];


    if (newImgUrl.length > 0) {
      const oldImgUrl = existingProduct.imageURLs;

      for (const url of oldImgUrl) {
        const urlParams = new URL(url);
        const fileId = urlParams.searchParams.get("id");
        if (fileId) {
          // Gọi middleware xóa hình ảnh
          await deleteFromDrive({ params: { fileId: fileId } }, res, () => {});
        }
      }

      existingProduct.imageURLs = newImgUrl;
    }

    const result = await Product.findByIdAndUpdate(
      id,
      {
        ...req.body,
        imageURLs: existingProduct.imageURLs, // Cập nhật hình ảnh
      },
      {
        new: true, // Trả về sản phẩm đã cập nhật
      }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: false,
    });
  }
};

// [DELETE] /products/deleteProduct/:id
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Xóa brand
    await Brand.updateOne(
      { products: productId },
      { $pull: { products: productId } }
    );

    // Xóa Category
    await Category.updateMany(
      { products: productId },
      { $pull: { products: productId } }
    );

    // Xóa Seen Product
    await SeenProd.updateMany(
      { products: productId },
      { $pull: { products: productId } }
    );

    // Xóa Tag Product
    await Tag.updateMany(
      { products: productId },
      { $pull: { products: productId } }
    );

    // Xóa Specs
    await Specs.deleteMany({ products: productId });

    // Xóa WishList
    await wishList.updateMany(
      { products: productId },
      { $pull: { products: productId } }
    );

    // Tìm sản phẩm theo ID
    const product = await Product.findById(productId);

    // Lấy danh sách hình ảnh để xóa
    for (const url of product.imageURLs) {
      const urlParams = new URL(url);
      const fileId = urlParams.searchParams.get("id");
      if (fileId) {
        // Gọi middleware xóa hình ảnh
        await deleteFromDrive({ params: { fileId: fileId } }, res, () => {});
      }
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json(true);
  } catch (error) {
    res.status(500).json({
      message: false,
    });
  }
};

// [GET] /products/detail/:id
export const detail = async (req, res) => {
  try {
    const id = req.params.id;

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
    res.status(500).json(false);
  }
};

// [GET] /stats/specs-per-product
export const getProductSpecsStatistics = async (req, res) => {
  try {
    const sort = req.query.sort === "asc" ? 1 : -1;
    const stats = await Product.aggregate([
      {
        $lookup: {
          from: "specifications", // Bảng tham chiếu
          localField: "specs", // Trường specs trong Product
          foreignField: "_id", // Liên kết với _id trong specifications
          as: "specifications", // Tên trường sẽ chứa các specs liên kết
        },
      },
      {
        $project: {
          productName: 1,
          specsCount: { $size: "$specifications" }, // Số lượng specs
          specsIDs: "$specs", // Mảng chứa các specs ID
        },
      },
      { $sort: { specsCount: sort } }, // Sắp xếp theo số lượng specs
    ]);

    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json(false);
  }
};

// [GET] /stats/product-discount
export const getProductWithDiscountStatistics = async (req, res) => {
  try {
    const sort = req.query.sort === "asc" ? 1 : -1;
    const stats = await Specs.aggregate([
      {
        $group: {
          _id: {
            $cond: {
              if: { $gt: ["$discountPercentage", 0] },
              then: "Discounted",
              else: "No Discount",
            },
          }, // Nhóm theo có/không giảm giá
          count: { $sum: 1 }, // Đếm số lượng sản phẩm
          productIDs: { $push: "$products" }, // Mảng chứa các product ID có giảm giá
        },
      },
      { $sort: { count: sort } }, // Sắp xếp theo số lượng
    ]);

    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json(false);
  }
};

// [GET] /stats/total-stock-value
export const getTotalStockValue = async (req, res) => {
  try {
    const stats = await Specs.aggregate([
      {
        $group: {
          _id: null, // Không nhóm theo trường nào cụ thể
          totalStockValue: {
            $sum: { $multiply: ["$price", "$stockQuantity"] },
          }, // Tính tổng giá trị hàng tồn kho
        },
      },
      {
        $project: {
          _id: 0, // Không hiển thị _id
          totalStockValue: 1,
        },
      },
    ]);

    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json(false);
  }
};

// [GET] /products/statistic-brand/:brandId
export const statisticBrand = async (req, res) => {
  try {
    const brandId = req.params.brandId;
    const brand = await Brand.findOne({ _id: brandId }).populate("products");
    res.status(200).json(brand.products);
  } catch (error) {
    res.status(500).json(false);
  }
};
