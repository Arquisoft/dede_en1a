import express, { Router } from 'express';
import * as ProductController from "./../controllers/ProductController";
import * as bodyParser from 'body-parser';

const productRouter:Router = express.Router()

productRouter.use(bodyParser.json());

productRouter.get(
	"/list", 
	ProductController.findAllProducts
);
productRouter.get(
	"/details/:id", 
	ProductController.findProduct
);
productRouter.put(
	"/add", 
	ProductController.addProduct
);
productRouter.delete(
	"/delete/:id", 
	ProductController.deleteProduct
);
productRouter.post(
	"/update/:id", 
	ProductController.updateProduct
);

export default productRouter;   