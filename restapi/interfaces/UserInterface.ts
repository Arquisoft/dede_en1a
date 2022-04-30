import mongoose from "mongoose";
import {Document, Schema} from "mongoose";

export type UserRole = "ADMIN" | "SELLER"

export interface IUser extends Document {
    webId: string
	name?: string,
	role: UserRole,
	password: string
}
