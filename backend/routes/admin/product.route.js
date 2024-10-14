import { Router } from "express";
import * as controller from "../../controller/admin/product.controller.js";

const router = Router();

router.get("/", controller.index);

export default router;
