import {Request, Response} from "express"
import Product from "../schemas/ProductSchema"
import User from "../schemas/UserSchema"
import { sendError } from "./helper/hellpers"


export let findAllUsers = async (req: Request, res: Response) => {
	await User.find()
		.then(result => res.status(200).send(result))
		.catch(error =>  sendError(error, res))
}

export let findUserById = async(req: Request, res: Response) => {
    await User.findById(req.params.id)
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}

export let addUser = async(req: Request, res: Response) => {
	const user = new User(req.params.id)
    await user.save()
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}

export let updateUser = async(req: Request, res: Response) => {
    await User.findByIdAndUpdate(req.params.id, req.body)
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}

export let deleteUser = async(req: Request, res: Response) => {
    // delete all productd from user
	await User.findById(req.params.id)
		.then(result => {
			if (result != null) {
				Product.deleteMany({seller_id: result._id})
					.then(result => console.log("deleted " + result.deletedCount + " products"))
					.catch(error => sendError(error, res))

				result.remove()
					.then(() => res.status(200).send("deleted user: " + result._id))
					.catch(error => sendError(error, res))
				} else {
					res.status(200).send("nothing was removed")
				}
			})
		.catch(error => sendError(error, res))
}