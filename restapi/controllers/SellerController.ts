import {Request, Response} from "express";
import * as sellerRepository from "../repository/SellerRepository";


export let findAllSellers = async (req: Request, res: Response) => {
    await sellerRepository.getAll()
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
            return res.status(200).send(seller)
        }).catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
}