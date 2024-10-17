import Cart from "../../models/cart.model.js";
import Voucher from "../../models/voucher.model.js";

const cartController = {
  // [PATCH] /client/cart
  updateCart: async (req, res) => {
    try {
      const { cartId, cartItems, voucherId } = req.body;

      let cart = await Cart.findById(cartId);

      if (!cart) {
        return res.status(404).json({
          code: 404,
          message: "Giỏ hàng không tồn tại.",
        });
      }

      if (cartItems && cartItems.length > 0) {
        cartItems.forEach((item) => {
          // Tìm sản phẩm trong giỏ
          const cartItem = cart.cartItems.find(
            (i) => i.spec.toString() === item.spec
          );

          // Nếu sản phẩm đã có, cập nhật số lượng
          if (cartItem) {
            cartItem.quantity = item.quantity;
          } else {
            // Nếu sản phẩm chưa có, thêm mới vào giỏ
            cart.cartItems.push({
              spec: item.spec,
              quantity: item.quantity,
            });
          }
        });
      }

      // Add voucher to the cart if voucherId is provided
      if (voucherId) {
        console.log("Tam");
        const voucherExist = await Voucher.findOne({
          _id: voucherId,
          clients: {
            $elemMatch: {
              clientId: req.params.id,
              usageLimitPerCustomer: { $gt: 0 },
            },
          },
        });

        if (!voucherExist) {
          return res.status(404).json({
            code: 404,
            message: "Voucher không tồn tại.",
          });
        }

        // Add the voucher to the cart if it doesn't already exist
        if (!cart.vouchers.includes(voucherId)) {
          cart.vouchers.push(voucherId);
        }
      }

      // Save the updated cart
      await cart.save();

      return res.status(200).json({
        code: 200,
        message: "Giỏ hàng đã được cập nhật thành công.",
        data: cart,
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Quá trình cập nhật giỏ hàng gặp lỗi. Vui lòng thử lại.",
        error: err.message,
      });
    }
  },
};

export default cartController;
