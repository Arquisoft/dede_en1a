import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import {ObjectId} from "mongodb";
const Seller = require("./schemas/Seller")
const sellerRest = require("./repository/SellerRepository")
const api:Router = express.Router()

interface User {
    name: string;
    email: string;
}

//This is not a restapi as it mantains state but it is here for
//simplicity. A database should be used instead.
let users: Array<User> = [];

api.get(
    "/users/list",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send(users);
    }
);

api.post(
  "/users/add",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
  ],
  async (req: Request, res: Response): Promise<Response> => {
    let name = req.body.name;
    let email = req.body.email;
    let user: User = {name:name,email:email}
    users.push(user);
    return res.sendStatus(200);
  }
);

// Seller routes
api.get(
    "/sellers/list",
    [],
    async(req: Request, res: Response) => {
        const sellers = await sellerRest.all;
        res.status(200).send(sellers)
    }
)

api.get(
    "/sellers/:id",
    [check('name').isLength({ min: 1 }).trim().escape()],
    async(req: Request, res: Response) => {
        const seller = await sellerRest.findById(req.body.id)
        res.status(200).send(seller)
    }
)

api.post(
    "sellers/add",
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
        sellerRest.create(seller)
        res.status(200).send(seller)
    }
)

api.post(
    "/sellers/update",
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
        sellerRest.update(id, seller)
        res.status(200).send(seller)
    }
)

api.post(
    "/sellers/delete",
    [],
    async(req: Request, res: Response) => {
        let id = req.body.id
        sellerRest.delete(id);
        res.status(200).send(seller)
    }
)

export default api;