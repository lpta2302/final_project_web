import cartRoutes from "./cart.route.js";

export default (app) => {
  app.use("/cart", cartRoutes);
};
