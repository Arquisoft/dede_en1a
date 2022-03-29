import {Request, Response} from "express";
import * as OrderRepository from "./../repository/OrderRepository";

export let findAllOrders = async (req: Request, res: Response) => {
    await OrderRepository.findAllOrders()
        .then((results) => {
            return res.status(200).send(results);
        })
        .catch((error) => {
            console.error(error.message);
            return res.status(500).json({
                message: error.message,
                error
            });
        });
}

export let findOrderById = async (req: Request, res: Response) => {
    await OrderRepository.findOrderById(req.params.id)
        .then((result) => {
            return res.status(200).send(result);
        })
        .catch((error) => {
            console.error(error.message);
            return res.status(500).json({
                message: error.message,
                error
            });
        });
}


export let findOrderByWebId = async (req: Request, res: Response) => {
    await OrderRepository.findOrderById(req.params.id)
        .then((result) => {
            return res.status(200).send(result);
        })
        .catch((error) => {
            console.error(error.message);
            return res.status(500).json({
                message: error.message,
                error
            });
        });
}

export let addOrder = async (req: Request, res: Response) => {
    await OrderRepository.createOrder(req.body)
        .then((result) => {
            return res.status(200).send(result);
        })
        .catch((error) => {
            console.error(error.message);
            return res.status(500).json({
                message: error.message,
                error
            });
        });
}

export let deleteOrder = async (req: Request, res: Response) => {
    await OrderRepository.deleteOrder(req.params.id)
        .then((result) => {
            return res.status(200).send(result);
        })
        .catch((error) => {
            console.error(error.message);
            return res.status(500).json({
                message: error.message,
                error
            });
        });
}

export let updateOrder = async (req: Request, res: Response) => {
    await OrderRepository.updateOrder(req.params.id, req.body)
        .then((result) => {
            return res.status(200).send(result);
        })
        .catch((error) => {
            console.error(error.message);
            return res.status(500).json({
                message: error.message,
                error
            });
        });
}

export let addProduct = async (req: Request, res: Response) => {
	await OrderRepository.addProduct(req.params.id, req.body.productId, req.body.amount)
	.then((result) => {
		return res.status(200).send(result);
	})
	.catch((error) => {
		console.error(error.message);
		return res.status(500).json({
			message: error.message,
			error
		});
	})
}