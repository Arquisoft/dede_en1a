import mongoose, {Schema} from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const sellerSchema = new Schema({
    id: {type: ObjectId, required: true, unique: true},
    name: String,
    products: [] // Later on it will contain ProductModel elements.
})

export let Seller = mongoose.model("Seller", sellerSchema)





