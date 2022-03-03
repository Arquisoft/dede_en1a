import { privateDecrypt } from "crypto";
import {ObjectId} from "mongoose";
import { Product } from "../schemas/ProductSchema";


export function findProductById(id: ObjectId) {
	return Product.findById(id);
}

export function findAllProducts() {
	return Product.find({});
}

export function updateProduct(id: ObjectId, product: Document) {
	return Product.findByIdAndUpdate(id, product);
}

// TODO
export function findByName(name: String) {
	return Product.find({})
}

export function createProduct(product: Document) {
	return Product.create(product);
}

export function deleteProduct(id: ObjectId) {
	return Product.findByIdAndDelete(id);
}