import express, {Router} from "express"
import * as userController from "../controllers/userController"


const userRouter: Router = express.Router()

userRouter.get("/list", userController.findAllUsers)
userRouter.get("/details/:id", userController.findUserById)
userRouter.post("/add", userController.addUser)
userRouter.post("/update/:id", userController.updateUser)
userRouter.get("/delete/:id", userController.deleteUser)

export default userRouter;