import productRoutes from "./product.route.js";
import accountRoutes from "./account.route.js";
import categoryRoutes from "./category.route.js";
import tagRoutes from "./tag.route.js";
import authenticateJWT from "../../middleware/authMiddleware.js";
import specRoutes from "./specification.route.js";
import brandRoutes from "./brand.route.js";
import authRoutes from "./auth.route.js";

export default (app) => {
  app.use("/product", authenticateJWT, productRoutes);
  app.use("/account", accountRoutes);
  app.use("/auth", authRoutes);
  app.use("/category", authenticateJWT, categoryRoutes);
  app.use("/tag", authenticateJWT, tagRoutes);
  app.use("/category", categoryRoutes);
  app.use("/spec", specRoutes);
  app.use("/brand", brandRoutes);
};
