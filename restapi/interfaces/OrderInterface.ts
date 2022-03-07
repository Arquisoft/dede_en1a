import { Document } from "mongoose";
import IProduct from "./ProductInterface";
import IUser from "./UserInterface";

export default interface IOrder extends Document {
    user: IUser,
    products: Map<IProduct, Number>
}