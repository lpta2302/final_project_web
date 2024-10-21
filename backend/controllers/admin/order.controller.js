import Order from "../../models/order.model.js";

// [GET] /order
export const index = async (req, res) => {
  const order = await Order.find({});

  res.json(order);
};

// [GET] /order/detail/:orderId
export const detail = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findOne({ _id: orderId });
    res.json(order);
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Thêm category thất bại",
    });
  }
};

// [GET] /order/user/:orderId
export const orderOfUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const order = await Order.find({ userId: userId });
    res.json(order);
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
export const deleteOrder = async (req, res) => {
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
