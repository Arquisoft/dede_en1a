import {Request, Response, Router} from "express";
import {findSellerById, findAllSellers, updateSeller, createSeller, deleteSeller} from "../repository/SellerRepository";
import {ObjectId} from "mongodb";
import {Seller} from "../schemas/SellerSchema";


const express = require("express");

const api: Router = express.Router();

/**
 * Gets a specific seller given its ID. (ObjectId, it is a large string)
 */
api.get(
    "/sellers/:id",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send(findSellerById(new ObjectId(req.params.id)));
    }
)

/**
 * Gets all the sellers.
 */
api.get(
    "/sellers/list",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send(findAllSellers())
    }
)

/**
 * Add a new seller to the database.
 */
api.post(
    "/sellers/add",
    [], // Check the new fields of the seller, Will be finished later.
    async (req:Request, res: Response): Promise<Response> => {
        let name = req.body.name;
        let products = undefined; // Will be used later.
        let seller: Document = new Seller(new ObjectId(), name, []);
        createSeller(seller);
        return res.sendStatus(200);
    }
)

/**
 * Add a new seller to the database.
 */
api.post(
    "/sellers/delete",
    [], // Check the new fields of the seller, Will be finished later.
    async (req:Request, res: Response): Promise<Response> => {
        let id: ObjectId = new ObjectId(req.body.id);
        deleteSeller(id);
        return res.sendStatus(200);
    }
)

/**
 * TODO: Add product to a seller.
 */
api.post(
    "/sellers/products/add"
)

/**
 * TODO: Add product to a seller.
 */
api.post(
    "/sellers/products/delete"
)

