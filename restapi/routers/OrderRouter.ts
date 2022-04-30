import express, {Router} from "express"
import * as orderController from "../controllers/OrderController"
import { checkJWT } from "../middleware/checkJWT"
import { checkRole } from "../middleware/checkRole"

const orderRouter: Router = express.Router()

orderRouter.get(
    "/list", 
	[checkJWT, checkRole(["ADMIN"])], 
    orderController.findAllOrders
)
orderRouter.get(
    "/details/:id", 
    orderController.findOrderById
)
orderRouter.get(
    "/list/user/:webId", 
    orderController.findOrderByWebId
)
orderRouter.post(
    "/add", 
    orderController.addOrder
)
orderRouter.post(
    "/update/:id", 
    [checkJWT, checkRole(["ADMIN"])], 
    orderController.updateOrder
)
orderRouter.get(
    "/delete/:id", 
    [checkJWT, checkRole(["ADMIN"])], 
    orderController.deleteOrder
)

export default orderRouter;