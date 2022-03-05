import {Document} from "mongoose";

export default interface IProduct extends Document {
    name: String,
    price: Number,
    description: String,
    image: String,
    weight: Number
}