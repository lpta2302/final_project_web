import Category from "../../models/category.model.js";

// [GET] /category
export const index = async (req, res) => {
  const category = await Category.find({});

  res.json(category);
};
