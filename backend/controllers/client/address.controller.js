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

    const record = new Address(req.body);

    await record.save();

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
