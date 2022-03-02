import {Seller} from "../schemas/SellerSchema";
import {ObjectId} from "mongodb";

// Basic CRUD functions of seller.

const findSellerById = function(id: ObjectId) {
    return Seller.findById(id);
}

const findAllSellers = () => {
    return Seller.find({});
}

const updateSeller = function (id: ObjectId, seller: Document){
    return Seller.findByIdAndUpdate(id, seller);
}

const createSeller = function(seller: Document) {
    return Seller.create(seller);
}

const deleteSeller = function (id: ObjectId){
    return Seller.findByIdAndDelete(id);
}