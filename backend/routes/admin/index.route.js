import productRoutes from "./product.route.js";

export default (app) => {
  app.use("/product", productRoutes);
};
