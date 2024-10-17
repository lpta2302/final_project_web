import Voucher from "../../models/voucher.model.js";

const voucherController = {
  // [GET] client/voucher/
  showVoucher: async (req, res) => {
    try {
      const vouchers = await Voucher.find();

      res.status(200).json({
        code: 200,
        message: "Hiển thị tất cả voucher thành công.",
        data: vouchers,
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Quá trình hiển thị gặp lỗi. Vui lòng thử lại.",
        error: err.message,
      });
    }
  },

  //[GET] client/voucher/my-voucher
  showMyVoucher: async (req, res) => {
    try {
      const myVoucher = await Voucher.find({
        clients: {
          $elemMatch: {
            clientId: req.params.id,
            usageLimitPerCustomer: { $gt: 0 },
          },
        },
      });

      res.status(200).json({
        code: 200,
        message: "Hiển thị thành công Voucher của bạn.",
        data: myVoucher,
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Quá trình hiển thị gặp lỗi. Vui lòng thử lại.",
        error: err.message,
      });
    }
  },

  //[POST] client/voucher/
  addVoucher: async (req, res) => {
    try {
      const voucherId = req.body.voucherId;
      const clientId = req.params.id;

      const voucherExist = await Voucher.findOne({
        _id: voucherId,
        clients: {
          $elemMatch: {
            clientId: clientId,
            usageLimitPerCustomer: { $gt: 0 },
          },
        },
      });

      if (voucherExist) {
        return res.status(400).json({
          code: 400,
          message:
            "Bạn không thể thêm Voucher này. Vui lòng chọn Voucher khác.",
        });
      }

      const result = await Voucher.updateOne(
        { _id: voucherId },
        {
          $push: {
            clients: {
              clientId: clientId,
              usageLimitPerCustomer: req.body.usageLimitPerCustomer,
            },
          },
        }
      );

      res.status(200).json({
        code: 200,
        message: "Thêm Voucher thành công.",
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Quá trình thêm voucher gặp lỗi. Vui lòng thử lại.",
        error: err.message,
      });
    }
  },

  // [PATCH] /client/voucher/my-voucher/del
  delVoucher: async (req, res) => {
    try {
      const voucherId = req.body.id;

      const result = await Voucher.findOneAndUpdate(
        { _id: voucherId },
        {
          $pull: {
            clients: {
              clientId: req.params.id,
            },
          },
        }
      );

      res.status(200).json({
        code: 200,
        message: "Xóa voucher thành công.",
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Quá trình xóa thất bại. Vui lòng thử lại.",
        error: err.message,
      });
    }
  },

  // [GET] /client/voucher/my-voucher/search
  searchVoucher: async (req, res) => {
    try {
      // Lấy từ khóa tìm kiếm (nếu không có thì mặc định là chuỗi rỗng)
      const search = req.query.search || "";

      // Điều kiện lọc và sắp xếp
      let sort = req.query.sort || "voucherName"; // Mặc định sắp xếp theo tên voucher (voucherName)

      // Cấu trúc dữ liệu sắp xếp (tăng dần hoặc giảm dần)
      req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

      let sortBy = {};
      if (sort[1]) {
        sortBy[sort[0]] = sort[1];
      } else {
        sortBy[sort[0]] = "asc"; // Mặc định sắp xếp tăng dần
      }

      // Tìm kiếm trong voucherName, discountPercentage, và description
      const vouchers = await Voucher.find({
        $or: [
          { voucherName: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      }).sort(sortBy);

      // Trả về kết quả tìm kiếm
      res.status(200).json({
        code: 200,
        message: "Tìm kiếm voucher thành công",
        data: vouchers, // Trả về danh sách voucher tìm được
      });
    } catch (err) {
      // Xử lý lỗi
      res.status(500).json({
        code: 500,
        message: "Quá trình tìm kiếm gặp lỗi. Vui lòng thử lại.",
        error: err.message,
      });
    }
  },
};

export default voucherController;
