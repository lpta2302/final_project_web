import Seen from "../../models/seen.model.js";

// [POST] /client/seen/add
export const add = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Tìm xem người dùng đã có danh sách xem gần đây chưa
    const seen = await Seen.findOne({ userId: userId });

    if (!seen) {
      const record = new Seen({
        userId: userId,
        products: [productId],
      });

      await record.save();
      return res.status(200).json({
        code: 200,
        message: "Thêm sản phẩm vào danh sách yêu thích thành công",
      });
    }

    // Kiểm tra sản phẩm đã tồn tại trong danh sách chưa
    if (seen.products.includes(productId)) {
      return res.status(200).json({
        code: 200,
        message: "Sản phẩm đã tồn tại trong danh sách",
      });
    }

    // Nếu danh sách đã đủ 10 sản phẩm, xóa sản phẩm đầu tiên
    if (seen.products.length >= 10) {
      seen.products.shift(); // Xóa phần tử đầu tiên
    }

    // Thêm productId vào cuối mảng
    seen.products.push(productId);

    // Lưu cập nhật
    await Seen.updateOne(
      { userId: userId },
      {
        products: seen.products,
      }
    );

    res.status(200).json({
      code: 200,
      message: "Cập nhật danh sách xem gần đây thành công",
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Thêm sản phẩm thất bại",
      error: error.message,
    });
  }
};

// [GET] /client/seen/:userId
export const getSeenProducts = async (req, res) => {
  try {
    const { userId } = req.params;

    // Tìm bản ghi `seen` của người dùng
    const seen = await Seen.findOne({ userId: userId }).populate("products");

    if (!seen || seen.products.length === 0) {
      return res.status(404).json({
        code: 404,
        message: "Không tìm thấy danh sách sản phẩm đã xem gần đây",
      });
    }

    res.status(200).json({
      code: 200,
      products: seen.products,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Lấy danh sách sản phẩm thất bại",
      error: error.message,
    });
  }
};
