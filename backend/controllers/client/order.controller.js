import Order from "../../models/order.model.js";

// [GET] /client/order/user/:id
export const index = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await Order.find({ userId: id });

    res.json(order);
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Đã có lỗi xảy ra",
      error: error.message,
    });
  }
};

// [GET] /client/order/add
export const add = async (req, res) => {
  try {
    const record = new Order(req.body);
    await record.save();

    res.json(true);
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Đã có lỗi xảy ra",
      error: error.message,
    });
  }
};
