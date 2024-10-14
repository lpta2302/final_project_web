import { Router } from "express";
import * as controller from "../../controller/admin/product.controller.js";

const router = Router();

router.get("/", controller.index);
router.get("/productDetail/:id", controller.detail);
router.post("/postProduct", controller.postProduct);
router.patch("/editProduct/:id", controller.editProduct);
router.delete("/deleteProduct/:id", controller.deleteProduct);
router.get("/search", controller.search);

export default router;
