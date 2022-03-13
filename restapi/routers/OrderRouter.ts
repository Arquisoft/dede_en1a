import express, {Router} from "express"
import * as orderController from "../controllers/OrderController"
import * as bodyParser from "body-parser";

const orderRouter: Router = express.Router()
orderRouter.use(bodyParser.json())

orderRouter.get("/list", orderController.findAllOrders)
orderRouter.get("/details/:id", orderController.findOrderById)
orderRouter.post("/add", orderController.addOrder)
orderRouter.post("/update/:id", orderController.updateOrder)
orderRouter.delete("/delete/:id", orderController.deleteOrder)
orderRouter.post("/addProduct/:id", orderController.addProduct)

export default orderRouter;