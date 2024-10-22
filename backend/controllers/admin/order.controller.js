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

// [PATCH] /order/edit/:orderId
export const edit = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    await Order.updateOne({ _id: orderId }, { processStatus: "completed" });

    res.json(true);
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Sửa đơn hàng thất bại",
    });
  }
};

// [GET] /order/search
export const search = async (req, res) => {
  try {
    // Khởi tạo filter là một đối tượng trống
    let filter = {};

    // Lấy giá trị từ query params
    const { orderId, userId } = req.query;

    // Kiểm tra nếu categoryCode có trong query
    if (orderId) {
      filter._id = orderId; // Tìm kiếm chính xác theo categoryCode
    }

    // Kiểm tra nếu categoryName có trong query
    if (userId) {
      filter.userId = userId;
    }

    // Tìm kiếm với bộ lọc filter
    const order = await Order.find(filter);

    // Trả về kết quả
    res.json(order);
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Tìm kiếm order thất bại",
    });
  }
};
