import {Request, Response, NextFunction } from 'express';
import User from '../schemas/UserSchema';


export const checkRole = (roles: string[]) => {
    return async (req : Request, res : Response, next : NextFunction) => {
        // get the webId from the previous middleware  
		const payload = res.locals.jwtPayload
        if ( roles.indexOf(payload.role) > -1) { 
            next();
        }
        else
            res.status(401).send('invalid permission level')
    }
}