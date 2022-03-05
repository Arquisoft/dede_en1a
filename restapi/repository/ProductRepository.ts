import mongoose from "mongoose";
import { ObjectId } from "mongoose";
import IProduct from "../interfaces/ProductInterface";
import Product from "../schemas/ProductSchema";



export async function findAllProducts() {
	return await Product.find({});
}

export async function findProductById(id: String) {
	return await Product.findById(id);
}

export async function updateProduct(id: String, product: IProduct) {
	return await Product.findByIdAndUpdate(id, product);
}

export async function createProduct(product: IProduct) {
	const prod = new Product(product);
	return await prod.save();
}

export async function deleteProduct(id: String) {
	return await Product.findByIdAndDelete(id);
}