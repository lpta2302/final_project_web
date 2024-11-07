import Order from "../../models/order.model.js";
import Cart from "../../models/cart.model.js";
import Voucher from "../../models/voucher.model.js";

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
    // Lấy `userId`, `cart`, và `voucher` từ yêu cầu gửi lên
    const {
      userId,
      cart,
      voucher = [],
      shippingCost = 0,
      ...orderData
    } = req.body;

    // Tìm `oldCart` dựa trên `userId`
    const oldCart = await Cart.findOne({ client: userId });

    let newCart;
    if (oldCart) {
      // Loại bỏ sản phẩm có `spec` trùng lặp trong `oldCart`
      cart.cartItems.forEach((newCartItem) => {
        oldCart.cartItems = oldCart.cartItems.filter(
          (oldCartItem) => oldCartItem.spec.toString() !== newCartItem.spec
        );
      });
      await oldCart.save();

      // Tạo giỏ hàng mới không chứa `userId`
      newCart = new Cart({ cartItems: cart.cartItems });
    } else {
      // Tạo giỏ hàng mới có chứa `userId`
      newCart = new Cart({ client: userId, cartItems: cart.cartItems });
    }
    await newCart.save();
    orderData.cart = newCart._id;

    // Populate spec in cart items to retrieve price and discountPercentage
    await Cart.populate(cart, {
      path: "cartItems.spec",
      select: "price discountPercentage",
    });

    // Tính tổng tiền các sản phẩm trong giỏ hàng với giá giảm
    let itemsTotal = 0;
    cart.cartItems.forEach((item) => {
      const price = item.spec.price || 0;
      const discountPercentage = item.spec.discountPercentage || 0;
      const discountedPrice = price * (1 - discountPercentage);
      itemsTotal += item.quantity * discountedPrice;
    });

    // Tính tổng discountAmount từ tất cả các voucher
    let discountAmount = 0;
    for (const voucherId of voucher) {
      const appliedVoucher = await Voucher.findById(voucherId);
      if (appliedVoucher) {
        const voucherDiscountPercentage =
          appliedVoucher.discountPercentage || 0;
        const voucherFixedAmount = appliedVoucher.fixedAmount || 0;

        // Tính giảm giá từ voucher, đảm bảo không vượt quá `fixedAmount`
        const calculatedDiscount = Math.min(
          itemsTotal * (voucherDiscountPercentage / 100),
          voucherFixedAmount
        );

        // Cộng dồn discountAmount từ từng voucher
        discountAmount += calculatedDiscount;
      }
    }

    // Tính tổng tiền đơn hàng (totalAmount)
    const totalAmount = itemsTotal - discountAmount + shippingCost;

    // Lưu thông tin `totalAmount` và `discountAmount` vào `orderData`
    orderData.totalAmount = totalAmount;
    orderData.discountAmount = discountAmount;
    orderData.shippingCost = shippingCost;
    orderData.userId = userId;

    // Lưu voucher vào đơn hàng
    orderData.voucher = voucher;

    // Tạo đơn hàng mới và lưu vào cơ sở dữ liệu
    const newOrder = new Order(orderData);
    await newOrder.save();

    // Populate `spec`, `voucher`, và các trường khác trong response
    const populatedOrder = await Order.findById(newOrder._id)
      .populate({
        path: "cart",
        populate: {
          path: "cartItems.spec",
          select: "price discountPercentage",
        },
      })
      .populate("voucher"); // Populate voucher thông tin

    res.json(populatedOrder);
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
