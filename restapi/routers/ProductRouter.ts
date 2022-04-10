import express, { Router } from 'express';
import * as ProductController from "./../controllers/ProductController";

const productRouter:Router = express.Router()


productRouter.get("/list", ProductController.findAllProducts);
productRouter.get("/details/:id", ProductController.findProduct);
productRouter.post("/update/:id", ProductController.updateProduct);
productRouter.post('/add/', ProductController.addProduct)
productRouter.get('/delete/:id', ProductController.deleteProduct)
productRouter.get('/list-for-user/:id', ProductController.findProductBysellerId)

export default productRouter;   