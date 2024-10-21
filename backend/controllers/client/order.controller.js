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

// [POST] /client/order/add
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

// [PATCH] /client/order/edit/:idOrder
export const edit = async (req, res) => {
  try {
    const orderId = req.params.idOrder;

    const { address, voucher } = req.body;

    const updateData = {};
    if (address) updateData.address = address;
    if (voucher) updateData.voucher = voucher;

    await Order.updateOne({ _id: orderId }, updateData);

    res.json(true);
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error,
    });
  }
};

// [GET] /client/order/edit/:idOrder
export const detail = async (req, res) => {
  try {
    const orderId = req.params.orderID;

    console.log(orderId);

    const record = await Order.findOne({ _id: orderId });

    res.json(record);
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error,
    });
  }
};
