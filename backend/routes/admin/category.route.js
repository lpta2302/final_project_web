import { Router } from "express";
import * as controller from "../../controllers/admin/category.controller.js";

const router = Router();

router.get("/", controller.index);
router.post("/add", controller.add);

export default router;
