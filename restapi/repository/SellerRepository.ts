import {Seller} from "../schemas/SellerSchema";
import {ObjectId} from "mongodb"


// Basic CRUD functions of seller.

export function findSellerById(id: ObjectId) {
    return Seller.findById(id);
}

export function findAllSellers() {
    return Seller.find({});
}

export function updateSeller(id: ObjectId, seller: Document){
    return Seller.findByIdAndUpdate(id, seller);
}

export function createSeller(seller: Document) {
    return Seller.create(seller);
}

export function deleteSeller(id: ObjectId){
    return Seller.findByIdAndDelete(id);
}