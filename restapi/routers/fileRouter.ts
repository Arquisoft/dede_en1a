import { Request, Response, Router } from "express"
import { renameSync } from "fs"
import multer from 'multer'
import path from "path"
import { checkJWT } from "../middleware/checkJWT"
import { checkRole } from "../middleware/checkRole"

const FileRouter = Router()
const dir = 'public/images/'

const upload = multer({
	fileFilter: (req, file, cb) => {
		if (['image/jpg', 'image/jpeg'].includes(file.mimetype)) {
			cb (null, true)
		} else {
			cb (null, false)
		}
	},
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, dir)
		},
		filename: (req, file, cb) => {
			console.log(req.body)
			cb(null, req.body.name + '.jpg')
		}
	}),
	limits: {
		fileSize: 8000000 // Sensitive: 10MB is more than the recommended limit of 8MB
	},
})
	
	
FileRouter.post('/upload', [checkJWT, checkRole(["SELLER", "ADMIN"]), upload.single('image')], (req: Request, res: Response) => {
	if (req.file != null) {
		
		
	}
})


export default FileRouter