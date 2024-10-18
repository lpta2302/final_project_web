import Account from "../../models/account.model.js";

const accountController = {
  // [GET] client/account/details/:id
  showDetailsInfo: async (req, res) => {
    try {
      const client = await Account.findById(req.params.id);

      res.status(200).json({
        code: 200,
        message: "Hiển thị thông tin cá nhân thành công.",
        data: client,
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message:
          "Quá trình hiển thị thông tin cá nhân gặp lỗi. Vui lòng thử lại.",
        error: err.message,
      });
    }
  },

  // [PATCH] client/account/details/:id
  updateDetailsInfo: async (req, res) => {
    try {
      const allowedUpdates = [
        "password",
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "dateOfBirth",
      ];
      const updates = Object.keys(req.body);
      const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
      );

      if (!isValidOperation) {
        return res.status(400).json({
          code: 400,
          message: "Trường thông tin cập nhật không hợp lệ. Vui lòng chọn lại.",
        });
      }

      const client = await Account.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      res.status(200).json({
        code: 200,
        message: "Sửa thông tin cá nhân thành công.",
        data: client,
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Quá trình cập nhật thông tin gặp lỗi. Vui lòng thử lại.",
        error: err.message,
      });
    }
  },
};

export default accountController;
