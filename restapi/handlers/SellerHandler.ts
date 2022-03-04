import express, { Request, Response, Router } from 'express'
import {ObjectId} from "mongodb"
const sellerRepository = require("../repository/SellerRepository")
const Seller = require("../schemas/Seller")
const router = express.Router()

// Seller routes
router.get(
    "/list",
    [],
    async (req: Request, res: Response) => {
        const sellers = await sellerRepository.all;
        res.status(200).send(sellers)
    }
)

router.get(
    "/:id",
    [],
    async(req: Request, res: Response) => {
        const seller = await sellerRepository.findById(req.body.id)
        res.status(200).send(seller)
    }
)

router.post(
    "/add",
    [],
    async(req: Request, res: Response) => {
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
    }
)

router.post(
    "/update",
    [],
    async(req: Request, res: Response) => {
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
    }
)

router.post(
    "/delete",
    [],
    async(req: Request, res: Response) => {
        let id = req.body.id
        sellerRepository.delete(id)
        res.status(200).send(seller)
    }
)

exports.sellerRouter = router