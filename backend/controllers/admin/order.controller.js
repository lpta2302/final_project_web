import Order from "../../models/order.model.js";

// [GET] /order
export const index = async (req, res) => {
  const order = await Order.find({});

  res.status(200).json(order);
};

// [GET] /order/detail/:orderId
export const detail = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findOne({ _id: orderId });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(false);
  }
};

// [GET] /order/user/:orderId
export const orderOfUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const order = await Order.find({ userId: userId });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(false);
  }
};

// [PATCH] /order/edit/:orderId
export const edit = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const result = await Order.findOneAndUpdate(
      { _id: orderId },
      { processStatus: "completed" },
      { new: true }
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(false);
  }
};

// [DELETE] /category/delete/:id
export const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;

    await Order.deleteOne({ _id: id });

    res.status(200).json(true);
  } catch (error) {
    res.status(500).json(false);
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
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(false);
  }
};

// [GET] /order/statistic
export const statistic = async (req, res) => {
  try {
    let data = {};

    // Sử dụng countDocuments để tối ưu truy vấn
    const totalOrders = await Order.countDocuments({});
    const orderComplete = await Order.countDocuments({
      processStatus: "completed",
    });
    const orderPending = await Order.countDocuments({
      processStatus: "pending",
    });
    const orderCancel = await Order.countDocuments({
      processStatus: "cancelled",
    });

    // Gán dữ liệu vào đối tượng trả về
    data.order = totalOrders;
    data.orderComplete = orderComplete;
    data.orderPending = orderPending;
    data.orderCancel = orderCancel;

    // Trả về kết quả
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(false);
  }
};

// [GET] /order/statistic-revenue/:type
export const statisticRevenue = async (req, res) => {
  try {
    const type = req.query.type;
    let startDate, endDate;

    // Lấy ngày hiện tại
    const currentDate = new Date();

    switch (type) {
      case "day":
        // Lấy thời gian bắt đầu và kết thúc của ngày
        startDate = new Date(currentDate);
        startDate.setHours(0, 0, 0, 0); // Bắt đầu từ 00:00:00 của hôm nay
        endDate = new Date(currentDate);
        endDate.setHours(23, 59, 59, 999); // Kết thúc 23:59:59 của hôm nay
        break;

      case "week":
        // Lấy thời gian bắt đầu và kết thúc của tuần
        startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - currentDate.getDay()); // Chủ Nhật đầu tuần
        startDate.setHours(0, 0, 0, 0); // Bắt đầu từ 00:00:00
        endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6); // Thứ Bảy cuối tuần
        endDate.setHours(23, 59, 59, 999); // Kết thúc 23:59:59
        break;

      case "month":
        // Lấy thời gian bắt đầu và kết thúc của tháng
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        ); // Ngày 1 của tháng
        endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        ); // Ngày cuối của tháng
        endDate.setHours(23, 59, 59, 999); // Kết thúc 23:59:59
        break;

      case "year":
        // Lấy thời gian bắt đầu và kết thúc của năm
        startDate = new Date(currentDate.getFullYear(), 0, 1); // Ngày 1/1 của năm
        endDate = new Date(currentDate.getFullYear(), 11, 31); // Ngày 31/12 của năm
        endDate.setHours(23, 59, 59, 999); // Kết thúc 23:59:59
        break;

      default:
        return res.status(400).json(false);
    }

    // Lấy ra các đơn hàng đã hoàn thành trong khoảng thời gian xác định dựa trên createdAt
    const orders = await Order.find({
      processStatus: "completed",
      createdAt: { $gte: startDate, $lt: endDate },
    });

    // Kiểm tra xem có đơn hàng nào không
    if (orders.length === 0) {
      return res.status(200).json(0);
    }

    // Tính tổng doanh thu
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    res.status(200).json({ totalRevenue });
  } catch (error) {
    res.status(500).json(false);
  }
};
