import express, {Router} from "express"
import { body, param } from "express-validator"
import * as userController from "../controllers/userController"
import { checkJWT } from "../middleware/checkJWT"
import { checkRole } from "../middleware/checkRole"


const userRouter: Router = express.Router()

userRouter.post('/login',userController.login)
userRouter.post('/signup', userController.signup)


userRouter.get(
	'/promote/:webId', 
	[checkJWT, checkRole(["ADMIN"])], 
	userController.promoteToAdmin
)
userRouter.get(
	"/list", 
	[checkJWT, checkRole(["ADMIN"])], 
	userController.findAllUsers
)
userRouter.get(
	"/details/:webId", 
	[checkJWT, checkRole(["ADMIN"])], 
	userController.findUserByWebId
)
userRouter.post(
	"/update/:webId", 
	[checkJWT, checkRole(["ADMIN"])], 
	userController.updateUser
)
userRouter.get(
	"/delete/:webId", 
	[checkJWT, checkRole(["ADMIN"])], 
	userController.deleteUser
)

export default userRouter;