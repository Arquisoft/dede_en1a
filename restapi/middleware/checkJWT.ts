import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';

export const checkJWT = (req : Request, res : Response, next: NextFunction) => {
    // get the jwt token from the head
    const token = <string>req.headers["auth"]

    try {
        let JWTPayload = <jwt.JwtPayload>jwt.verify(token, <jwt.Secret>process.env.RESTAPI_JWT_SECRET) 
		if(Date.now() >= JWTPayload.exp! * 1000) {
			res.status(401).send("The token has expired, please log in again")
			return;
		}
        res.locals.jwtPayload = JWTPayload; 
    } catch (error) {
        res.status(401).send("an error has happened while authorizing");
        return;
    }

    next()
}