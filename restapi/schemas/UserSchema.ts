import {Schema} from "mongoose";
import mongoose from "mongoose";
import {IUser} from "../interfaces/UserInterface";
import Product from "./ProductSchema"

const userSchema = new Schema<IUser>({
	webId: {type: String, required: true},
	name: {type: String, required: false},
	role: {type: String, enum: ["ADMIN", "SELLER"], required: true}
})

export default mongoose.model<IUser>("User", userSchema)