import productRoutes from "./product.route.js";
import accountRoutes from "./account.route.js";

export default (app) => {
  app.use("/product", productRoutes);
  app.use("/auth", accountRoutes);
};
