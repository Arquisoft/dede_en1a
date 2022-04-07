
import { Router, Request, Response} from 'express';
import { getPriceFromAddress } from '../geocoder/geocoder';

const geocoderRouter:Router = Router()


geocoderRouter.post("", async (req: Request, res: Response) => {
	await getPriceFromAddress(req.body)
		.then((response : any) => {
			res.status(200).send(response);
			console.log(response)
		}).catch((error : any) => {
			res.status(500).json({
				message: error.message,
				error
			})
		})
})

export default geocoderRouter;