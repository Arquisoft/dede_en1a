import * as jwt from 'jsonwebtoken';



import express, {Request, Response, Router} from "express"

const authRouter: Router = express.Router()
authRouter.get("", async (req: Request, res : Response) => {
		let webId = req.params.webId;
		if (webId != null) {
			let token = jwt.sign({webId: webId}, <jwt.Secret>process.env.JWT_SECRET, { expiresIn: '3h' });
			res.status(200).send(token);
		}
	}
)



export default authRouter;