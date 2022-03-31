import { Document } from "mongoose";
import IProduct from "./ProductInterface";

export default interface IOrder extends Document {
    webId: string
    addres: string
    shipping: number
    totalPrice: number
    products: Map<IProduct, Number>
}