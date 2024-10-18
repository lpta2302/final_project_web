import { Router } from "express";
import productController from "../../controllers/client/product.controller.js";

const productRouter = Router();
//PRODUCT

// Tìm kiếm sản phẩm dựa theo tag
productRouter.get("/tag/search/:tagId", productController.searchTag);

// Tìm sản phẩm
productRouter.get("/search", productController.searchProduct);

// Xem chi tiết sản phẩm
productRouter.get("/details/:id", productController.showDetailsProduct);

// Xem sản phẩm
productRouter.get("/", productController.showProduct);

export default productRouter;
