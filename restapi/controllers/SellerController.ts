import {Request, Response} from "express";
import {ObjectId} from "mongodb";
const Seller = require("../schemas/Seller")
const sellerRepository = require("../repository/SellerRepository")

exports.sellerRest = {
    all: async (req: Request, res: Response) => {
            const sellers = await sellerRepository.all;
            res.status(200).send(sellers)
    },
    findById: async(req: Request, res: Response) => {
        const seller = await sellerRepository.findById(req.body.id)
        res.status(200).send(seller)
    },
    add: async(req: Request, res: Response) => {
        let id = new ObjectId()
        let name = req.body.name
        let products = req.body.products
        let seller = new Seller({
            id: id,
            name: name,
            products: products
        })
        sellerRepository.create(seller)
        res.status(200).send(seller)
    },
    update: async(req: Request, res: Response) => {
        let id = req.body.id
        let name = req.body.name
        let products = req.body.products
        let seller = new Seller({
            id: id,
            name: name,
            products: products
        })
        sellerRepository.update(id, seller)
        res.status(200).send(seller)
    },
    delete: async(req: Request, res: Response) => {
        let id = req.body.id
        sellerRepository.delete(id);
        res.status(200).send(seller)
    }
}



