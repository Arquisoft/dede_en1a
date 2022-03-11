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
		await ProductRepository.deleteProduct(product);
	}
	seller?.delete();
}


export async function addProductToSeller(id:any, product:IProduct) {
	// get seller
	const seller = await findById(id);
	if (!seller) {
		throw new Error("seller does not exist")
	}
	// create product
	let productDoc = new Product(product);
	productDoc.save();
	// add product id to seller
	seller.products.push(productDoc.id);
	// return updated seller
	return seller.save();
}

export async function removeProductFromSeller(id:any, productId: any) {
	// get seller
	const seller = await findById(id);
	if (!seller) {
		throw new Error("seller does not exist")
	}
	// search for product and remove it
	for (const [index, element] of seller!.products.entries()) {
		if (element == productId){
			await ProductRepository.deleteProduct(element)
			seller!.products.splice(index, 1);
			break;
		}
	}
	return seller?.save();
}

