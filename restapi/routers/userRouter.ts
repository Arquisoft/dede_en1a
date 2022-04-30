import express, {Router} from "express"
import * as userController from "../controllers/userController"
import { checkJWT } from "../middleware/checkJWT"
import { checkRole } from "../middleware/checkRole"


const userRouter: Router = express.Router()
userRouter.post('/login', userController.login)
userRouter.post('/signup', userController.signup)
userRouter.patch('/promote/:webID', [checkJWT, checkRole(["ADMIN"])], userController.promoteToAdmin)

userRouter.get("/list", [checkJWT, checkRole(["ADMIN"])], userController.findAllUsers)

userRouter.get("/details/:id", [checkJWT, checkRole(["ADMIN"])], userController.findUserById)
userRouter.post("/update/:id", [checkJWT, checkRole(["ADMIN"])], userController.updateUser)
userRouter.get("/delete/:id", [checkJWT, checkRole(["ADMIN"])], userController.deleteUser)

export default userRouter;