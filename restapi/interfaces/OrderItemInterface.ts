import { Document } from "mongoose";
import IProduct from "./ProductInterface";

export default interface IOrderItem extends Document {
    product: IProduct
    amount: number
}