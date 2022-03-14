import express, {Request, Response, Router} from "express"
import * as sellerController from "../controllers/SellerController"
import * as bodyParser from "body-parser";


const sellerRouter: Router = express.Router()
sellerRouter.use(bodyParser.json())

sellerRouter.get("/list", sellerController.findAllSellers)
sellerRouter.get("/details/:id", sellerController.findSellerById)
sellerRouter.post("/add", sellerController.addSeller)
sellerRouter.post("/update/:id", sellerController.updateSeller)
sellerRouter.post("/delete/:id", sellerController.deleteSeller)

export default sellerRouter;