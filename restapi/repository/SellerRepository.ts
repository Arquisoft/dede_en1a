const Seller = require("../schemas/Seller.ts")
import {ObjectId} from "mongodb"

// Basic CRUD functions of seller.
exports.sellerRest = {
    all: async function findAllSellers() {
        return Seller.find({});
    },
    findById: async function findSellerById(id: ObjectId) {
        return Seller.findById(id);
    },
    update: async function updateSeller(id: ObjectId, seller: Document){
        return Seller.findByIdAndUpdate(id, seller);
    },
    create: async function createSeller(seller: Document) {
        return Seller.create(seller);
    },
    delete: async function deleteSeller(id: ObjectId){
        return Seller.findByIdAndDelete(id);
    }
}