import { Router } from "express";

import * as controller from "../../controllers/client/order.controller.js";

const router = Router();

router.get("/user/:id", controller.index);
router.post("/add", controller.add);

export default router;
