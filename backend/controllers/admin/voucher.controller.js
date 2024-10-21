import Voucher from "../../models/voucher.model.js";

// [GET] /voucher
export const index = async (req, res) => {
  const voucher = await Voucher.find({});

  res.json(voucher);
};

// [POST] /voucher/add
export const add = async (req, res) => {
  try {
    console.log(req.body);

    const record = new Voucher(req.body);
    await record.save();

    res.json({
      code: 200,
      message: "Tạo voucher thành công",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Thêm voucher thất bại",
    });
  }
};

// [PATCH] /voucher/edit
export const edit = async (req, res) => {
  try {
    const id = req.params.id;

    await Voucher.updateOne({ _id: id }, req.body);

    res.json({
      code: 200,
      message: "Sửa voucher thành công",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Sửa voucher thất bại",
    });
  }
};

// [DELETE] /voucher/delete/:id
export const deleteVoucher = async (req, res) => {
  try {
    const id = req.params.id;

    await Voucher.deleteOne({ _id: id });

    res.json({
      code: 200,
      message: "Xóa voucher thành công",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Xóa voucher thất bại",
    });
  }
};

// [GET] /tag/search
export const search = async (req, res) => {
  try {
    // Khởi tạo filter là một đối tượng trống
    let filter = {};

    // Lấy giá trị từ query params
    const { voucherName, minDiscount, maxDiscount, minPrice, maxPrice } =
      req.query;

    if (voucherName) {
      filter.voucherName = { $regex: voucherName, $options: "i" };
    }

    // Nếu có điều kiện lọc theo khoảng khuyến mãi
    if (minDiscount || maxDiscount) {
      filter.discountPercentage = {};
      if (minDiscount) {
        filter.discountPercentage.$gte = parseFloat(minDiscount); // Lọc giá trị lớn hơn hoặc bằng minDiscount
      }
      if (maxDiscount) {
        filter.discountPercentage.$lte = parseFloat(maxDiscount); // Lọc giá trị nhỏ hơn hoặc bằng maxDiscount
      }
    }

    // Nếu có điều kiện lọc theo lượng tiền
    if (minPrice || maxPrice) {
      filter.fixedAmount = {};
      if (minPrice) {
        filter.fixedAmount.$gte = parseFloat(minPrice); // Lọc giá trị lớn hơn hoặc bằng
      }
      if (maxPrice) {
        filter.fixedAmount.$lte = parseFloat(maxPrice); // Lọc giá trị nhỏ hơn hoặc bằng
      }
    }

    // Tìm kiếm với bộ lọc filter
    const voucher = await Voucher.find(filter);

    // Trả về kết quả
    res.json(voucher);
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Tìm kiếm voucher thất bại",
    });
  }
};
