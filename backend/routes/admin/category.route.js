import { Router } from "express";
import * as controller from "../../controllers/admin/category.controller.js";

const router = Router();

router.get("/", controller.index);

export default router;
