import * as jwt from 'jsonwebtoken';


export function createToken(webId:any) {
    if (webId != null) {
        let token = jwt.sign({webId: webId}, <jwt.Secret>process.env.JWT_SECRET, { expiresIn: '3h' });
        return token;
    }
    return "";
}