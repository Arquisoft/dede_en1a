import ISeller from "../interfaces/SellerInterface";

import Seller from "../schemas/SellerSchema"
import mongoose from "mongoose";

// Basic CRUD functions of seller.

export let getAll = async function findAllSellers() {
        return await Seller.find({});
}
export let findById = async function findSellerById(id: any) {
        return Seller.findById(id);
}
export let createOrUpdateSeller = async function createOrUpdateSeller(seller: ISeller) {
        let sellerDoc = new Seller(seller)
        sellerDoc.id = new mongoose.Types.ObjectId()
        return await sellerDoc.save()
}
export let deleteSeller = async function deleteSeller(id: any){
        return await Seller.findByIdAndDelete(id);
}
