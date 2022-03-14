import mongoose from "mongoose";
import { ObjectId } from "mongoose";
import IProduct from "../interfaces/ProductInterface";
import Product from "../schemas/ProductSchema";



export async function findAllProducts() {
	return await Product.find({});
}

export async function findProductById(id: any) {
	return await Product.findById(id);
}

export async function updateProduct(id: any, product: IProduct) {
	return await Product.findByIdAndUpdate(id, product);
}

export async function createProduct(product: IProduct) {
	const prod = new Product(product);
	return await prod.save();
}

export async function deleteProduct(id: any) {
	return await Product.findByIdAndDelete(id);
}