import {Request, Response} from "express";
import { Jwt } from "jsonwebtoken";
import Product from "../schemas/ProductSchema"
import { sendError } from "./helper/hellpers";

export let findAllProducts = async (req: Request, res: Response) => {
	await Product.find()
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}

export let findProduct = async (req: Request, res: Response) => {
	await Product.findById(req.params.id)
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}


export let addProduct = async (req: Request, res: Response) => {
	const product = new Product({
		name: req.body.name,
		price: req.body.price,
		description: req.body.description,
		seller_id: res.locals.jwtPayload.id
	})
	await product.save()
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}

export let addProductWithImage = async (req: Request, res: Response) => {
	const product = new Product({
		name: req.body.name,
		price: req.body.price,
		description: req.body.description,
		seller_id: res.locals.jwtPayload.id
	})
	await product.save()
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}

export let deleteProduct = async (req: Request, res: Response) => {
	await Product.findByIdAndDelete(req.params.id)
		.then(result => res.status(200).send('Succesfully deleted product'))
		.catch(error => sendError(error, res))
}


export let updateProduct = async (req: Request, res: Response) => {
	await Product.findByIdAndUpdate(req.params.id, req.body)
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}

export let findProductBysellerId = async (req: Request, res: Response) => {
	await Product.find({seller_id: req.params.id})
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))	
}