import _Brand from "../../models/brand.model.js";

// [GET] /client/brand
export const index = async (req, res) => {
  try {
    const brand = await _Brand.find({});

    res.json(brand);
  } catch (error) {
    res.status(400).json({
      code: 400,
      error: error.message,
    });
  }
};
