import { Router } from "express";

import * as controller from "../../controllers/client/address.controller.js";

const router = Router();

router.get("/:accountId", controller.index);
router.post("/add", controller.post);

export default router;
