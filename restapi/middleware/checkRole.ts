import {Request, Response, NextFunction } from 'express';
import User from '../schemas/UserSchema';


export const checkRole = (roles: string[]) => {
    return async (req : Request, res : Response, next : NextFunction) => {
        // get the webId from the previous middleware  
        const webId = res.locals.jwtPayload.userId
        let user = await User.findOne({webId : webId}).then(result => {
            return result
        }).catch(error => {
            res.status(401).send('An error was proeuced while recuperating the user')
        }) 

        if (user != null && roles.indexOf(user.role) > -1) { 
            res.locals.role = user.role;
            res.locals.seller_id = user._id;
            next();
        }
        else
            res.status(401).send('An error was proeuced while autenticating the user')
    }
}