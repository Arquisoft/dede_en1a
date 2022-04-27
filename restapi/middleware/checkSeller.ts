import { Request, Response, NextFunction } from "express";
import Product from '../schemas/ProductSchema'

export const checkSeller = (roles: string[]) => {
    return async (req : Request, res : Response, next : NextFunction) => {
        // get the webId from the previous middleware  
        const webId = res.locals.jwtPayload.userId
       
        // in case of admin proceed
        if (res.locals.role === "ADMIN")
            next();
        // check ownership
        Product.findById(req.params.id, 'seller_id').then(result => {
            if (result?.seller_id === res.locals.seller_id) {
                next()
            }
            res.status(401).send('you don\'t own this product')
        }).catch(error => {
            res.status(500).send('An error was produced while autenticating the user')
        })
    }
}