import express, { Router } from 'express';
import { checkJWT } from '../middleware/checkJWT';
import { checkRole } from '../middleware/checkRole';
import * as ProductController from "./../controllers/ProductController";

const productRouter:Router = express.Router()


productRouter.get(
    "/list", 
    ProductController.findAllProducts
);
productRouter.get(
    "/details/:id", 
    ProductController.findProduct
);
productRouter.post(
    "/update/:id", 
    [checkJWT, checkRole(["ADMIN", "SELLER"])], 
    ProductController.updateProduct
);
productRouter.post(
    '/add/', 
    [checkJWT, checkRole(["ADMIN", "SELLER"])], 
    ProductController.addProduct
)
productRouter.get(
    '/delete/:id', 
    [checkJWT, checkRole(["ADMIN", "SELLER"])], 
    ProductController.deleteProduct
)
productRouter.get(
    '/list-for-user/:id', 
    [checkJWT, checkRole(["ADMIN", "SELLER"])], 
    ProductController.findProductBysellerId
)

export default productRouter;   