import { Router } from "express";
import * as controller from "../../controller/admin/account.controller.js";

const router = Router();

router.post("/register", controller.register);

export default router;
