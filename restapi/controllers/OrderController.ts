import {Request, Response} from "express";
import Order from "../schemas/OrderSchema"
import { sendError } from "./helper/hellpers";

export let findAllOrders = async (req: Request, res: Response) => {
	await Order.find()
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}

export let findOrderById = async (req: Request, res: Response) => {
	await Order.findById(req.params.id)
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}

export let findOrderByWebId = async (req: Request, res: Response) => {
    await Order.find({webId: req.params.webId})
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}

export let addOrder = async (req: Request, res: Response) => {
	const order = new Order(req.body)
	await order.save()
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}

export let deleteOrder = async (req: Request, res: Response) => {
    await Order.findByIdAndDelete(req.params.id)
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}

export let updateOrder = async (req: Request, res: Response) => {
    await Order.findByIdAndUpdate(req.params.id, req.body)
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}