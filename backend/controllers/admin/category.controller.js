import Category from "../../models/category.model.js";

// [GET] /category
export const index = async (req, res) => {
  const category = await Category.find({});

  res.json(category);
};

// [POST] /category/add
export const add = async (req, res) => {
  try {
    console.log(req.body);

    const exitCategory = await Category.findOne({
      categoryCode: req.body.categoryCode,
    });
    if (exitCategory) {
      res.json({
        code: 500,
        message: "Mã category đã tồn tại!",
      });
      return;
    }

    const record = new Category(req.body);
    await record.save();

    res.json({
      code: 200,
      message: "Tạo category thành công",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Thêm category thất bại",
    });
  }
};

// [PATCH] /category/edit
export const edit = async (req, res) => {
  try {
    const id = req.params.id;

    await Category.updateOne({ _id: id }, req.body);

    res.json({
      code: 200,
      message: "Sửa category thành công",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Sửa category thất bại",
    });
  }
};

// [DELETE] /category/delete/:id
export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    await Category.deleteOne({ _id: id });

    res.json({
      code: 200,
      message: "Xóa category thành công",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Xóa category thất bại",
    });
  }
};

// [GET] /category/search
export const search = async (req, res) => {
  try {
    // Khởi tạo filter là một đối tượng trống
    let filter = {};

    // Lấy giá trị từ query params
    const { categoryCode, categoryName } = req.query;

    // Kiểm tra nếu categoryCode có trong query
    if (categoryCode) {
      filter.categoryCode = categoryCode; // Tìm kiếm chính xác theo categoryCode
    }

    // Kiểm tra nếu categoryName có trong query
    if (categoryName) {
      filter.categoryName = { $regex: categoryName, $options: "i" }; // Tìm kiếm gần đúng theo categoryName, không phân biệt hoa thường
    }

    // Tìm kiếm với bộ lọc filter
    const categories = await Category.find(filter);

    // Trả về kết quả
    res.json(categories);
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Tìm kiếm category thất bại",
    });
  }
};
