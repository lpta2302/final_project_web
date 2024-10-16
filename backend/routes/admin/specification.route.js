import { Router } from "express";
import specController from "../../controllers/admin/specification.controller.js";

const specRouter = Router();

// Tìm kiếm specification
specRouter.get("/search", specController.searchSpec);

// Sửa specification
specRouter.patch("/:specId", specController.updateSpec);

// Xóa specification
specRouter.delete("/:specId", specController.delSpec);

// Thêm specification
specRouter.post("/", specController.addSpec);

// Hiển thị specification
specRouter.get("/", specController.showSpec);

export default specRouter;
