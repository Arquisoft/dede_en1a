import {Request, Response} from 'express'
import Product from '../schemas/ProductSchema'
import User from '../schemas/UserSchema'
import { sendError } from './helper/hellpers'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { sanitizeParam } from 'express-validator'

export let findAllUsers = async (req: Request, res: Response) => {
	await User.find()
		.then(result => res.status(200).send(result))
		.catch(error =>  sendError(error, res))
}

export let findUserByWebId = async(req: Request, res: Response) => {
    await User.findOne({webId: req.params.webId})
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}

export let updateUser = async(req: Request, res: Response) => {
    await User.findOneAndUpdate({webId: req.params.webId}, req.body)
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}

export let deleteUser = async(req: Request, res: Response) => {
    // delete all productd from user
	await User.findOne({webId: req.params.webId})
		.then(result => {
			if (result != null) {
				Product.deleteMany({seller_id: result._id})
					.then(result => console.log('deleted ' + result.deletedCount + ' products'))
					.catch(error => sendError(error, res))

				result.remove()
					.then(() => res.status(200).send('deleted user: ' + result._id))
					.catch(error => sendError(error, res))
				} else {
					res.status(200).send('nothing was removed')
				}
			})
		.catch(error => sendError(error, res))
}


export let signup = async (req:Request, res:Response) => {

	if (req.body.webId == undefined || req.body.webId == null) {
		res.status(422).send('you must be logged in with your pod')
		return;
	} else if (req.body.password == undefined || req.body.password == null) {
		res.status(422).send('password can not be empty')
		return;
	}
	const password = await bcrypt.hash(req.body.password, parseInt(<string>process.env.RESTAPI_SALT_ROUNDS) || 10)
		.catch(error => sendError(error, res))

	const user = new User({
		webId: req.body.webId,
		password: password,
		name: req.body.name || '',
		role: 'SELLER'
	});
    user.save()
		.then(result => {
			const payload = {
				role: result.role,
				id: result._id,
				webId: result.webId
			}
		
			const token = jwt.sign(payload, <jwt.Secret>process.env.RESTAPI_JWT_SECRET, { expiresIn: '3h' });
			res.status(200).json({
				token: token,
				role: result.role,
				message: 'signed up successfully'
			})

		})
		.catch(error => {
			res.status(409).send('webId already registered')
			return;
		})

}

export let promoteToAdmin = async (req:Request, res: Response) => {
	const user = await User.updateOne({webid: req.params.webId}, {$set : {role: "ADMIN"}})
		.catch(error => sendError(error, res))
	const webId = req.params.webId;
	res.status(200).send('promoted user ' +sanitizeParam(webId) + ' to admin')

}


export let login = async (req:Request, res: Response) => {
	let query = {webId : req.params.webId.toString()}
	const user = await User.findOne(query)
	if (user == null) {
		res.status(401).send('error login user')
		return;
	} else {
		const passwordEqual = await bcrypt.compare(req.body.password, user.password)
			.catch(error => {
				res.status(500).send('error happened while checking the password')
				return;
			})
		// check if passwords match
		if (!passwordEqual) {
			res.status(401).send('passswords doesn\'t match')
			return;
		}
	}

	const payload = {
		role: user.role,
		id: user._id,
		webId: user.webId
	}

	const token = jwt.sign(payload, <jwt.Secret>process.env.RESTAPI_JWT_SECRET, { expiresIn: '3h' });
	res.status(200).json({
		token: token,
		role: user.role,
		message: 'logged in successfully'
	})
}