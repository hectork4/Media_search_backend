import { Router } from "express";

import * as productController from "../controllers/products.controller";

import { authJwt } from "../middlewares";

const router = Router()

router.get('/', productController.getProducts);
router.post('/', [authJwt.verifyToken, authJwt.isAdmin],  productController.createProduct);
router.get('/:productId', productController.getProductById);
router.put('/:productId',authJwt.verifyToken, productController.updateProductById);
router.delete('/:productId',authJwt.verifyToken, productController.deleteProductById);

export default router