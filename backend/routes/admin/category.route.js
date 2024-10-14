import { Router } from "express";
import * as controller from "../../controller/admin/category.controller.js";

const router = Router();

router.get("/", controller.index);

export default router;
