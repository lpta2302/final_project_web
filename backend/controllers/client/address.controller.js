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
