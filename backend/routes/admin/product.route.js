import { Router } from "express";
import * as controller from "../../controllers/admin/product.controller.js";

const router = Router();

router.get("/", controller.index);
router.get("/productDetail/:id", controller.detail);
router.post("/postProduct", controller.postProduct);
router.patch("/editProduct/:id", controller.editProduct);
router.delete("/deleteProduct/:id", controller.deleteProduct);
router.get("/search", controller.search);
router.get("/statistic-brand/:brandId", controller.statisticBrand);

export default router;
