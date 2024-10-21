import { Router } from "express";
import carouselController from "../../controllers/admin/carosel.controller.js";

const carouselRouter = Router();

// Xem
carouselRouter.get("/", carouselController.showCarousel);

// Xóa
carouselRouter.delete("/:id", carouselController.delCarousel);

// Thêm
carouselRouter.post("/", carouselController.addCarousel);

// Cập nhật
carouselRouter.patch("/:id", carouselController.updateCarousel);

export default carouselRouter;
