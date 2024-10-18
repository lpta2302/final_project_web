import { Router } from "express";

import * as controller from "../../controllers/client/brand.controller.js";

const router = Router();

router.get("/", controller.index);

export default router;
