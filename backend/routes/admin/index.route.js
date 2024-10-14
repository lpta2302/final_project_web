import productRoutes from "./product.route.js";
import accountRoutes from "./account.route.js";
import categoryRoutes from "./category.route.js";

export default (app) => {
  app.use("/auth", accountRoutes);
  app.use("/product", productRoutes);
  app.use("/category", categoryRoutes);
};
