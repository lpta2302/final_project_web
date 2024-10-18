import AccountModel from "../../models/account.model.js";
import Address from "../../models/adress.model.js";

// [GET] /client/address
export const index = async (req, res) => {
  try {
    const accountId = req.params.accountId;

    const address = await Address.find({ accountId: accountId });

    res.json(address);
  } catch (error) {
    res.status(400).json({
      code: 400,
      error: error.message,
    });
  }
};

// [POST] /client/address/add
export const post = async (req, res) => {
  try {
    console.log(req.body);

    // Lấy accountId từ request body (hoặc từ req.params nếu cần)
    const { accountId, ...addressData } = req.body;

    // Tạo bản ghi mới cho địa chỉ, bao gồm accountId
    const record = new Address({ accountId, ...addressData });

    // Lưu địa chỉ mới
    await record.save();

    // Thêm ObjectId của địa chỉ vào mảng addresses trong tài khoản
    await AccountModel.updateOne(
      { _id: accountId },
      {
        $push: {
          addresses: record._id, // Thêm ObjectId của địa chỉ vào mảng addresses
        },
      }
    );

    res.status(200).json({
      code: 200,
      message: "Tạo địa chỉ mới thành công",
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      error: error.message,
      message: "Tạo địa chỉ mới thất bại",
    });
  }
};

// [PATCH] /client/address/edit/:id
export const edit = async (req, res) => {
  try {
    const id = req.params.id;

    await Address.updateOne({ _id: id }, req.body);

    res.status(200).json({
      code: 200,
      message: "Cập nhập địa chỉ thành công",
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      error: error.message,
      message: "Cập nhập địa chỉ mới thất bại",
    });
  }
};

// [DELETE] /client/address/delete/:id
export const deleteAddress = async (req, res) => {
  try {
    // Tìm địa chỉ cần xóa
    const address = await Address.findOne({ _id: req.params.id });

    if (!address) {
      return res.status(404).json({
        code: 404,
        message: "Địa chỉ không tồn tại",
      });
    }

    // Xóa ObjectId của địa chỉ khỏi tài khoản
    await AccountModel.updateOne(
      { _id: address.accountId },
      {
        $pull: {
          addresses: address._id, // Sử dụng _id của địa chỉ
        },
      }
    );

    // Xóa địa chỉ
    await Address.deleteOne({ _id: req.params.id });

    res.status(200).json({
      code: 200,
      message: "Xóa địa chỉ thành công",
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      error: error.message,
      message: "Xóa địa chỉ thất bại",
    });
  }
};
