import AccountModel from "../../models/account.model.js";

// [POST] /register
export const register = async (req, res) => {
  const isAccount = await AccountModel.findOne({ email: req.body.email });

  if (isAccount) {
    // Nếu tài khoản đã tồn tại
    return res.status(400).json({
      code: 400,
      message: "Tài khoản đã tồn tại",
    });
  } else {
    const account = new AccountModel(req.body);
    account.save();

    res.status(200).json({
      code: 200,
      message: "Đăng ký thành công",
    });
  }
};
