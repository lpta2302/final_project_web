import mongoose from "mongoose";
import Cart from "../../models/cart.model.js";
import Voucher from "../../models/voucher.model.js";

// [POST] /cart/add
export const add = async (req, res) => {
  try {
    const { client, spec } = req.body;

    // Chuyển đổi spec từ chuỗi sang ObjectId
    const specObjectId = new mongoose.Types.ObjectId(spec);

    // Tìm giỏ hàng của client
    const exitCart = await Cart.findOne({ client: client });

    if (exitCart) {
      // Kiểm tra xem sản phẩm có cùng spec đã tồn tại trong cartItems chưa
      const itemIndex = exitCart.cartItems.findIndex(
        (item) => item.spec.toString() === specObjectId.toString()
      );

      if (itemIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        exitCart.cartItems[itemIndex].quantity++;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào cartItems
        exitCart.cartItems.push({
          spec: specObjectId, // Sử dụng ObjectId đã chuyển đổi
          quantity: 1, // Mặc định số lượng là 1
        });
      }

      // Cập nhật giỏ hàng bằng updateOne
      await Cart.updateOne(
        { client: client }, // Điều kiện để tìm giỏ hàng
        { cartItems: exitCart.cartItems } // Cập nhật lại danh sách cartItems sau khi thêm hoặc tăng số lượng
      );
    } else {
      // Nếu giỏ hàng chưa tồn tại, tạo mới giỏ hàng với sản phẩm đầu tiên
      const newCart = {
        client: client,
        cartItems: [
          {
            spec: specObjectId, // Sử dụng ObjectId đã chuyển đổi
            quantity: 1, // Mặc định số lượng là 1
          },
        ],
      };

      const record = new Cart(newCart);
      await record.save();
    }

    res.json({
      code: 200,
      message: "Thêm sản phẩm thành công",
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Thêm sản phẩm thất bại",
      error: error.message,
    });
  }
};

// [PATCH] /cart/delete
export const deleteProduct = async (req, res) => {
  try {
    const { client, spec } = req.body;

    await Cart.updateOne(
      { client: client }, // Điều kiện để tìm giỏ hàng của client
      {
        $pull: {
          cartItems: { spec: spec }, // Điều kiện để xóa cartItem có spec khớp
        },
      }
    );

    res.json({
      code: 200,
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Xóa sản phẩm thất bại",
      error: error.message,
    });
  }
};

// [POST] /cart/showCart
export const showCart = async (req, res) => {
  try {
    const { client } = req.body;

    // Tìm giỏ hàng của client và populate thông tin spec
    const cart = await Cart.findOne({ client: client }).populate({
      path: "cartItems.spec", // Populate spec trong cartItems
      select: "products price", // Chỉ lấy trường 'products' từ spec
      populate: {
        path: "products", // Populate product trong spec
        select: "productName", // Chỉ lấy 'productName' và 'price' từ product
        model: "product", // Tên của mô hình product
      },
    });

    // const spec_ = ... .populate
    // const productName = spec_ . populate

    if (!cart) {
      return res.status(404).json({
        code: 404,
        message: "Giỏ hàng không tồn tại",
      });
    }

    res.json({
      code: 200,
      message: "Lấy thông tin giỏ hàng thành công",
      cart: cart,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Lỗi khi lấy thông tin giỏ hàng",
      error: error.message,
    });
  }
};

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
