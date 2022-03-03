import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
const sellerController = require("./controllers/SellerController")
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
  sellerController.add
);

// Seller routes
api.get(
    "/sellers/list",
    [],
    sellerController.all
)

api.get(
    "/sellers/:id",
    [check('name').isLength({ min: 1 }).trim().escape()],
    sellerController.findById
)

api.post(
    "sellers/add",
    [],
    sellerController.add
)

api.post(
    "/sellers/update",
    [],
    sellerController.update
)

api.post(
    "/sellers/delete",
    [],
    sellerController.delete
)

export default api;