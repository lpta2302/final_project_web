import voucherRoutes from "./voucher.route.js";
import cartRoutes from "./cart.route.js";
import brandRoutes from "./brand.route.js";
import addressRoutes from "./address.route.js";

export default (app) => {
  app.use("/client/voucher", voucherRoutes);
  app.use("/client/cart", cartRoutes);
  app.use("/cart", cartRoutes);
  app.use("/client/brand", brandRoutes);
  app.use("/client/address", addressRoutes);
};
