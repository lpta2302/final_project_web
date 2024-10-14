import { Router } from "express";
import productController from "../../controllers/productController.js";

const router = Router();

router.post("/", productController.addProduct);

export default router;
