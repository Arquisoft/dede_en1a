import {Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/UserInterface';
import User from '../schemas/UserSchema';


export const checkRole = (roles: string[]) => {
    return async (req : Request, res : Response, next : NextFunction) => {
        // get the webId from the previous middleware  
        const webId = res.locals.jwtPayload.userId
        let user = await User.findOne({webId : webId}).then(result => {
            return result
        }).catch(error => {
            res.status(401).send('Se ha producido un error al recuperar el usuario')
        }) 

        if (user != null && roles.indexOf(user.role) > -1)
            next();
        else
            res.status(401).send('Se ha producido un error al autenticarse')
    }
}