import {Request, Response} from "express";
import * as ProductRepository from "./../repository/ProductRepository";


// - GET - /product/list # returns all products
export let findAllProducts = async (req: Request, res: Response) => {
	let products = await ProductRepository.findAllProducts();
	res.status(200).send(products);
}

// - GET - /product/{1} # returns a product with id 1
export let findProduct = async (req: Request, res: Response) => {
	let product = await ProductRepository.findProductById(req.params.id);
	res.status(200).send(product);
}


// - PUT - /product/add # inserts a new product into the table
export let addProduct = async (req: Request, res: Response) => {
	let product = await ProductRepository.createProduct(req.body);
	res.status(200).send(product);
}


// - DELETE - /product/{1} # deletes a product with id of 1
export let deleteProduct = async (req: Request, res: Response) => {
	let product = await ProductRepository.deleteProduct(req.params.id);
	res.status(200).send(product)
}


// - POST - /product/update/{1} # updates a book with id of 1
export let updateProduct = async (req: Request, res: Response) => {
	let product = await ProductRepository.updateProduct(req.params.id, req.body);
	res.status(200).send(product);
}