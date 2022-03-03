import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
const sellerController = require("./controllers/SellerController")
const api:Router = express.Router()

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