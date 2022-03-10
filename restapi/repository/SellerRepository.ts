import ISeller from "../interfaces/SellerInterface";
import IProduct from "../interfaces/ProductInterface";
import Seller from "../schemas/SellerSchema"
import Product from "../schemas/ProductSchema"
import * as ProductRepository from "./ProductRepository";
import mongoose from "mongoose";

// Basic CRUD functions of seller.

export async function findAllSellers() {
	return await Seller.find({});
}
export async function findById(id: any) {
	return Seller.findById(id);
}
export async function createOrUpdateSeller(seller: ISeller) {
	let sellerDoc = new Seller(seller)
	return await sellerDoc.save()
}
export async function deleteSeller(id: any){
	let seller = await findById(id)
	for (var product of seller!.products) {
		await ProductRepository.deleteProduct(product._id);
	}
	seller?.delete();
}


export async function addProductToSeller(id:String, product:IProduct) {
	let seller = await findById(id);
	let productDoc = new Product(product);
	productDoc.save();
	seller?.products.push(productDoc);
	return seller?.save();
}

export async function removeProductFromSeller(id:String, productId: String) {
	let seller = await findById(id);
	for (const [index, element] of seller!.products.entries()) {
		if (element._id == productId){
			await ProductRepository.deleteProduct(element._id)
			seller!.products.splice(index, 1);
			break;
		}
	}
	return seller?.save();
}

