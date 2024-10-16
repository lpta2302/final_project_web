import productRoutes from "./product.route.js";
import accountRoutes from "./account.route.js";
import categoryRoutes from "./category.route.js";
import tagRoutes from "./tag.route.js";
import authenticateJWT from "../../middleware/authMiddleware.js";

export default (app) => {
  app.use("/product", authenticateJWT, productRoutes);
  app.use("/account", authenticateJWT, accountRoutes);
  app.use("/auth", accountRoutes);
  app.use("/category", authenticateJWT, categoryRoutes);
  app.use("/tag", authenticateJWT, tagRoutes);
};
