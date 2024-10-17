import { Router } from "express";
import cartController from "../../controllers/client/cart.controller.js";

const cartRouter = Router();

// Cập nhật giỏ hàng
cartRouter.patch("/my-cart/:id", cartController.updateCart);

export default cartRouter;
