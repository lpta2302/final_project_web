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

// [GET] /client/brand
export const getProduct = async (req, res) => {
  try {
    const idBrand = req.params.idBrand;
    console.log(idBrand);

    const brand = await _Brand.findOne({ _id: idBrand }).populate("products");
    console.log(brand);

    res.json(brand);
  } catch (error) {
    res.status(400).json({
      code: 400,
      error: error.message,
    });
  }
};
