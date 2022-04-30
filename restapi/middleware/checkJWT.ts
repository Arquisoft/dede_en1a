import { Request, Response, NextFunction } from "express";
import { header } from "express-validator";
import * as jwt from 'jsonwebtoken';

export const checkJWT = (req : Request, res : Response, next: NextFunction) => {
    // get the jwt token from the head
    const token = <string>req.headers["auth"]

    try {
        let JWTPayload = <jwt.JwtPayload>jwt.verify(token, <jwt.Secret>process.env.RESTAPI_JWT_SECRET) 
		if(Date.now() >= JWTPayload.exp! * 1000) {
			res.status(401)
				.header('WWW-Authenticate', 'Basic realm="session has ended, pelase log in again"')
				.send("The token has expired, please log in again")
			return;
		}
        res.locals.jwtPayload = JWTPayload; 
    } catch (error) {
        res.status(401)
			.header('WWW-Authenticate', 'Basic realm="you need to be logged in"')
			.send("an error has happened while authorizing");
        return;
    }

    next()
}