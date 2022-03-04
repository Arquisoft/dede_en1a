const Seller = require("../schemas/SellerSchema.ts")

// Basic CRUD functions of seller.

export let getAll = async function findAllSellers() {
        return Seller.find({});
}
export let findById = async function findSellerById(id: any) {
        return Seller.findById(id);
}
export let updateSeller = async function updateSeller(id: any, seller: Document){
        return Seller.findByIdAndUpdate(id, seller);
}
export let createSeller = async function createSeller(seller: Document) {
        return Seller.create(seller);
}
export let deleteSeller = async function deleteSeller(id: any){
        return Seller.findByIdAndDelete(id);
}
