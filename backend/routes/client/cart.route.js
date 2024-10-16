import { Router } from "express";
import * as controller from "../../controllers/client/cart.controller.js";

const router = Router();

router.post("/add", controller.add);

export default router;
