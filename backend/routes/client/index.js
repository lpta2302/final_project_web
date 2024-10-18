import voucherRoutes from "./voucher.route.js";
import cartRoutes from "./cart.route.js";
import productRoutes from "./product.route.js";
import wishListRoutes from "./wishList.route.js";
import accountRoutes from "./account.route.js";

export default (app) => {
  app.use("/client/voucher", voucherRoutes);
  app.use("/client/cart", cartRoutes);
  app.use("/cart", cartRoutes);
  app.use("/client/product", productRoutes);
  app.use("/client/wishList", wishListRoutes);
  app.use("/client/account", accountRoutes);
};
