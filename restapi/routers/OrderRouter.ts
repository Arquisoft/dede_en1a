import express, {Router} from "express"
import * as orderController from "../controllers/OrderController"
import { checkJWT } from "../middleware/checkJWT"
import { checkRole } from "../middleware/checkRole"

const orderRouter: Router = express.Router()

orderRouter.get(
    "/list", 
    orderController.findAllOrders
)
orderRouter.get(
    "/details/:id", 
    [checkJWT, checkRole(["ADMIN"])], 
    orderController.findOrderById
)
orderRouter.get(
    "/list/user/:webId", 
    [checkJWT, checkRole(["ADMIN", "SELLER"])], 
    orderController.findOrderByWebId
)
orderRouter.post(
    "/add", 
    [checkJWT, checkRole(["ADMIN", "SELLER"])],
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