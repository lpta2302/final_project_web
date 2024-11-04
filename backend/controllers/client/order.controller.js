import Order from "../../models/order.model.js";

// [GET] /client/order/user/:id
export const index = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await Order.find({ userId: id })
      .populate({
        path: "address",
      })
      .populate({
        path: "voucher",
      })
      .populate({
        path: "cart",
        populate: {
          path: "cartItems",
          populate: {
            path: "spec",
            populate: {
              path: "products",
            },
          },
        },
      });

    res.json(order);
  } catch (error) {
    res.status(400).json(false);
  }
};

// [POST] /client/order/add
export const add = async (req, res) => {
  try {
    const record = new Order(req.body);
    await record.save();

    res.json(record);
  } catch (error) {
    res.status(400).json(false);
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

    // Cập nhật đơn hàng với dữ liệu đã kiểm tra
    const record = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
    });

    if (!record) {
      return res.status(404).json(false);
    }

    res.json(record);
  } catch (error) {
    res.status(400).json(false);
  }
};

// [GET] /client/order/edit/:idOrder
export const detail = async (req, res) => {
  try {
    const orderId = req.params.orderID;

    console.log(orderId);

    const record = await Order.findOne({ _id: orderId })
      .populate({
        path: "address",
      })
      .populate({
        path: "voucher",
      })
      .populate({
        path: "cart",
        populate: {
          path: "cartItems",
          populate: {
            path: "spec",
            populate: {
              path: "products",
            },
          },
        },
      });

    res.json(record);
  } catch (error) {
    res.status(400).json(false);
  }
};

// [DELETE] /client/order/edit/:idOrder
export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderID;

    const record = await Order.findOne({ _id: orderId });

    if (!record) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (record.processStatus === "pending") {
      await Order.deleteOne({ _id: orderId });
      return res.json(true);
    } else {
      return res.status(400).json(false);
    }
  } catch (error) {
    res.status(400).json(false);
  }
};
