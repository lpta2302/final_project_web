import mongoose from "mongoose";
import Cart from "../../models/cart.model.js";

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
      select: "products", // Chỉ lấy trường 'products' từ spec
      populate: {
        path: "products", // Populate product trong spec
        select: "productName price", // Chỉ lấy 'productName' và 'price' từ product
        model: "product", // Tên của mô hình product
      },
    });

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
