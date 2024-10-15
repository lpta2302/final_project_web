import Tag from "../../models/tag.model.js";

// [GET] /tag
export const index = async (req, res) => {
  const tag = await Tag.find({});

  res.json(tag);
};

// [POST] /tag/add
export const add = async (req, res) => {
  try {
    console.log(req.body);

    const exittag = await Tag.findOne({
      tagCode: req.body.tagCode,
    });
    if (exittag) {
      res.json({
        code: 500,
        message: "Mã tag đã tồn tại!",
      });
      return;
    }

    const record = new Tag(req.body);
    await record.save();

    res.json({
      code: 200,
      message: "Tạo tag thành công",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Thêm tag thất bại",
    });
  }
};

// [PATCH] /tag/edit
export const edit = async (req, res) => {
  try {
    const id = req.params.id;

    await Tag.updateOne({ _id: id }, req.body);

    res.json({
      code: 200,
      message: "Sửa tag thành công",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Sửa tag thất bại",
    });
  }
};

// [DELETE] /tag/delete/:id
export const deletetag = async (req, res) => {
  try {
    const id = req.params.id;

    await Tag.deleteOne({ _id: id });

    res.json({
      code: 200,
      message: "Xóa tag thành công",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Xóa tag thất bại",
    });
  }
};

// [GET] /tag/search
export const search = async (req, res) => {
  try {
    // Khởi tạo filter là một đối tượng trống
    let filter = {};

    // Lấy giá trị từ query params
    const { tagCode, tagName } = req.query;

    // Kiểm tra nếu tagCode có trong query
    if (tagCode) {
      filter.tagCode = tagCode; // Tìm kiếm chính xác theo tagCode
    }

    // Kiểm tra nếu tagName có trong query
    if (tagName) {
      filter.tagName = { $regex: tagName, $options: "i" }; // Tìm kiếm gần đúng theo tagName, không phân biệt hoa thường
    }

    // Tìm kiếm với bộ lọc filter
    const tags = await Tag.find(filter);

    // Trả về kết quả
    res.json(tags);
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Tìm kiếm tag thất bại",
    });
  }
};
