import mongoose from "mongoose";
import {Document, Schema} from "mongoose";
import IProduct from "./ProductInterface";

export default interface ISeller extends Document {
    name: String,
    products: [Schema.Types.ObjectId]
}