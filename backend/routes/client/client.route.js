import voucherRoutes from "./voucher.route.js";
import cartRoutes from "./cart.route.js";

export default (app) => {
  app.use("/client/voucher", voucherRoutes);
  app.use("/client/cart", cartRoutes);
};
