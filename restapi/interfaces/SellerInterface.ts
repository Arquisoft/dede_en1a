import {Document} from "mongoose";
import IProduct from "./ProductInterface";

export default interface ISeller extends Document {
    name: String,
    products: Array<IProduct>
}