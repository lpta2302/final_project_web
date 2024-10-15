import productRoutes from "./product.route.js";
import accountRoutes from "./account.route.js";
import categoryRoutes from "./category.route.js";
import tagRoutes from "./tag.route.js";

export default (app) => {
  app.use("/product", productRoutes);
  app.use("/account", accountRoutes);
  app.use("/auth", accountRoutes);
  app.use("/category", categoryRoutes);
  app.use("/tag", tagRoutes);
};
