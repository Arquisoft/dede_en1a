import {Request, Response} from "express";
import * as ProductRepository from "./../repository/ProductRepository";


// - GET - /product/list # returns all products
export let findAllProducts = async (req: Request, res: Response) => {
	await ProductRepository.findAllProducts()
		.then((results) => {
			return res.status(200).send(results);
		})
		.catch((error) => {
			return res.status(500).json({
				message: error.message,
				error
			});
		});
}

// - GET - /product/{1} # returns a product with id 1
export let findProduct = async (req: Request, res: Response) => {
	await ProductRepository.findProductById(req.params.id)
		.then((result) => {
			return res.status(200).send(result);
		})
		.catch((error) => {
			return res.status(500).json({
				message: error.message,
				error
			});
		});
}


// - PUT - /product/add # inserts a new product into the table
export let addProduct = async (req: Request, res: Response) => {
	await ProductRepository.createProduct(req.body)
		.then((result) => {
			return res.status(200).send(result);
		})
		.catch((error) => {
			return res.status(500).json({
				message: error.message,
				error
			});
		});
}


// - DELETE - /product/{1} # deletes a product with id of 1
export let deleteProduct = async (req: Request, res: Response) => {
	await ProductRepository.deleteProduct(req.params.id)
		.then((result) => {
			return res.status(200).send(result);
		})
		.catch((error) => {
			return res.status(500).json({
				message: error.message,
				error
			});
		});
}


// - POST - /product/update/{1} # updates a book with id of 1
export let updateProduct = async (req: Request, res: Response) => {
	await ProductRepository.updateProduct(req.params.id, req.body)
		.then((result) => {
			return res.status(200).send(result);
		})
		.catch((error) => {
			return res.status(500).json({
				message: error.message,
				error
			});
		});
}