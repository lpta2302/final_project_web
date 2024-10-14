import bcrypt from "bcrypt";
import AccountModel from "../../models/account.model.js";

// [POST] /auth/register
export const register = async (req, res) => {
  try {
    const isAccount = await AccountModel.findOne({ email: req.body.email });

    if (isAccount) {
      return res.status(400).json({
        code: 400,
        message: "Tài khoản đã tồn tại",
      });
    } else {
      // Mã hóa mật khẩu trước khi lưu
      const saltRounds = 10; // Số rounds salt
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds); // Mã hóa mật khẩu

      const account = new AccountModel({
        ...req.body,
        password: hashedPassword,
      });

      await account.save();

      res.status(200).json({
        code: 200,
        message: "Đăng ký thành công",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: "Đã có lỗi xảy ra trong quá trình đăng ký",
    });
  }
};
