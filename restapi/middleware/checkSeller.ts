import { Request, Response, NextFunction } from "express";
import Product from '../schemas/ProductSchema'

export const checkSeller = (req : Request, res : Response, next: NextFunction) => {
	// get the webId from the previous middleware  
	const payload = res.locals.jwtPayload
	
	Product.findById(req.params.id, 'seller_id').lean().then(result => {
		if (!result) {
			res.status(404).send('this product does not exist')
			return;
		
		}
		// in case of admin proceed 
		if (payload.role == "ADMIN") {
			next();
			return;
		} 
		else if (result.seller_id != payload.id) {
			res.status(401)
				.header('WWW-Authenticate', 'Basic realm="only the owner can manage this product"')
				.send('you don\'t own this product')
			return;
		} else {
			next();
		}
	}).catch(error => {
		res.status(500).send('An error was produced while autenticating the user: ' + error)
		return;
	})
}