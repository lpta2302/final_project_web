import productRoutes from "./product.route.js";
import accountRoutes from "./account.route.js";
import categoryRoutes from "./category.route.js";
import specRoutes from "./specification.route.js";
import brandRoutes from "./brand.route.js";

export default (app) => {
  app.use("/product", productRoutes);
  app.use("/account", accountRoutes);
  app.use("/auth", accountRoutes);
  app.use("/category", categoryRoutes);
  app.use("/spec", specRoutes);
  app.use("/brand", brandRoutes);
};
