import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';

export const checkJWT = (req : Request, res : Response, next: NextFunction) => {
    // get the jwt token from the head
    const token = <string>req.headers["auth"]
    let JWTPayload;

    try {
        JWTPayload = <any>jwt.verify(token, <jwt.Secret>process.env.JWT_SECRET) 
        res.locals.jwtPayload = JWTPayload; 
    } catch (error) {
        res.status(401).send("Se ha producido un error al autorizarse");
        return;
    }

    const {webId} = JWTPayload
    const newToken = jwt.sign({webId}, <jwt.Secret>process.env.JWT_SECRET, {
        expiresIn: "2h"
    })
    res.setHeader("token", newToken)

    next()
}