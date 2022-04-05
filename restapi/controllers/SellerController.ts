import {Request, Response} from "express";
import * as sellerRepository from "../repository/SellerRepository";
import * as productRepository from "../repository/ProductRepository";
import ProductSchema from "../schemas/ProductSchema";


export let findAllSellers = async (req: Request, res: Response) => {
    await sellerRepository.findAllSellers()
        .then((sellers) => {
            return res.status(200).send(sellers)
        }).catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
}

export let findSellerById = async(req: Request, res: Response) => {
    await sellerRepository.findById(req.params.id)
        .then((seller) => {
            return res.status(200).send(seller)
        }).catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
}

export let addSeller = async(req: Request, res: Response) => {
    console.log(req.body)
    await sellerRepository.createOrUpdateSeller(req.body)
        .then((seller) => {
            return res.status(200).send(seller)
        }).catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
}

export let updateSeller = async(req: Request, res: Response) => {
    await sellerRepository.createOrUpdateSeller(req.body)
        .then((seller) => {
            return res.status(200).send(seller)
        }).catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
}

export let deleteSeller = async(req: Request, res: Response) => {
    await sellerRepository.deleteSeller(req.params.id)
	.then((seller) => {
		return res.status(200).send(seller);
	}).catch((error) => {
		return res.status(500).json({
			message: error.message,
			error
		})
	})
}

export let addProductToSeller = async(req: Request, res: Response) => {
	await sellerRepository.addProductToSeller(req.params.id, req.body)
        .then((product) => {
            return res.status(200).send(product)
        }).catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
}

export let removeProductFromSeller = async(req: Request, res: Response) => {
    await sellerRepository.removeProductFromSeller(req.params.id, req.body.id)
        .then((seller) => {
            return res.status(200).send(seller)
        }).catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
}

export let removeAllProductsFromSeller = async(req: Request, res: Response) => {
    await sellerRepository.clearSellerFromProducts(req.body.id)
        .then((seller) => {
            return res.status(200).send(seller)
        }).catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
}