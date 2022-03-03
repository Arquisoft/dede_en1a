import mongoose, {Schema} from "mongoose";

const ObjectId  = mongoose.Types.ObjectId;

const productSchema = new Schema({
	id: {type: ObjectId, unique: true, required: true},
	name: {type: String, required: true},
	description: {type: String, required: false},
	price: {type: Number, required: true},
	image: {type: String, required: false},
	// not sure if we need this
	weight: {type: Number, required: false} 
})

export let Product = mongoose.model("Product", productSchema)