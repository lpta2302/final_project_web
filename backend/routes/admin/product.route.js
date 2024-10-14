import { Router } from "express";
import * as controller from "../../controller/admin/product.controller.js";

const router = Router();

router.get("/", controller.index);
router.post("/postProduct", controller.postProduct);
router.patch("/editProduct/:id", controller.editProduct);

export default router;
