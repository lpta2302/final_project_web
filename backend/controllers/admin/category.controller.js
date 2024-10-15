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
