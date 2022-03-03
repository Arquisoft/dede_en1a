const Seller = require("../schemas/Seller.ts")
import {ObjectId} from "mongodb"

// Basic CRUD functions of seller.
exports.sellerRest = {
    all: function findAllSellers() {
        return Seller.find({});
    },
    findById: function findSellerById(id: ObjectId) {
        return Seller.findById(id);
    },
    update: function updateSeller(id: ObjectId, seller: Document){
        return Seller.findByIdAndUpdate(id, seller);
    },
    create: function createSeller(seller: Document) {
        return Seller.create(seller);
    },
    delete: function deleteSeller(id: ObjectId){
        return Seller.findByIdAndDelete(id);
    }
}