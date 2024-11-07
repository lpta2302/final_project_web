import Order from "../../models/order.model.js";
import Cart from "../../models/cart.model.js";

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
    // Lấy `userId` và dữ liệu giỏ hàng từ yêu cầu gửi lên
    const { userId, cart, ...orderData } = req.body;

    // Tìm `oldCart` dựa trên `userId`
    const oldCart = await Cart.findOne({ client: userId });

    if (oldCart) {
      // Kiểm tra và loại bỏ sản phẩm có `spec` trùng lặp trong `oldCart`
      cart.cartItems.forEach((newCartItem) => {
        oldCart.cartItems = oldCart.cartItems.filter(
          (oldCartItem) => oldCartItem.spec.toString() !== newCartItem.spec
        );
      });

      // Lưu lại `oldCart` sau khi đã loại bỏ các sản phẩm trùng lặp
      await oldCart.save();

      // Tạo giỏ hàng mới không chứa `userId`
      const newCart = new Cart({
        cartItems: cart.cartItems, // Chỉ bao gồm các `cartItems` mới
      });
      await newCart.save();

      // Gán `_id` của `newCart` vào `orderData`
      orderData.cart = newCart._id;
    } else {
      // Nếu không có `oldCart`, tạo giỏ hàng mới và lưu `userId`
      const newCart = new Cart({
        client: userId,
        cartItems: cart.cartItems,
      });
      await newCart.save();

      // Gán `_id` của `newCart` vào `orderData`
      orderData.cart = newCart._id;
    }

    // Gán `userId` vào `orderData` để lưu trong đơn hàng
    orderData.userId = userId;

    // Tạo mới `Order` với `orderData` và lưu vào cơ sở dữ liệu
    const newOrder = new Order(orderData);
    await newOrder.save();

    res.json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Lỗi khi tạo đơn hàng" });
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
