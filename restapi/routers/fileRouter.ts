import { Request, Response, Router } from "express"
import { renameSync } from "fs"
import multer from 'multer'
import { checkJWT } from "../middleware/checkJWT"
import { checkRole } from "../middleware/checkRole"

const FileRouter = Router()
const dir = 'public/images/'
const upload = multer({dest: dir})


FileRouter.post('/upload', [checkJWT, checkRole(["SELLER", "ADMIN"]), upload.single('image')], (req: Request, res: Response) => {
	if (req.file != null)
		renameSync(req.file.path, 
			dir + req.body.name + '.' + req.file.mimetype.split('/').pop())

	console.log(req.file)
})

export default FileRouter