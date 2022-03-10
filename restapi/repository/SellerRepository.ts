import ISeller from "../interfaces/SellerInterface";
import Seller from "../schemas/SellerSchema"
import mongoose from "mongoose";
import IProduct from "../interfaces/ProductInterface";

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
		product.delete();
	}
	seller?.delete();
}


export async function addProductToSeller(id:String, product:IProduct) {
	let seller = await findById(id);
	seller?.products.push(product);
	return seller;
	
}

