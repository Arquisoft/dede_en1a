import express, {Router} from "express"
import * as orderController from "../controllers/OrderController"

const orderRouter: Router = express.Router()

orderRouter.get("/list", orderController.findAllOrders)
orderRouter.get("/details/:id", orderController.findOrderById)
orderRouter.get("/list/user/:webId", orderController.findOrderByWebId)
orderRouter.post("/add", orderController.addOrder)
orderRouter.post("/update/:id", orderController.updateOrder)
orderRouter.get("/delete/:id", orderController.deleteOrder)

export default orderRouter;