import express, { Application, RequestHandler, Request, Response } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import mongoose from "mongoose";

import sellerRouter from "./routers/SellerRouter";
import productRouter from "./routers/ProductRouter";
import orderRouter from "./routers/OrderRouter";

//initial commit backend
const uri: string = "mongodb+srv://admin:admin@cluster0.2sj0r.mongodb.net/DeDe_Database?retryWrites=true&w=majority";

const app: Application = express();
const port: number = 5000;
const options: cors.CorsOptions = {
  origin: ['http://localhost:3000']
};

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});

app.use(metricsMiddleware);
app.use(cors(options));
app.use(bp.json());

app.use("/", (req : Request, res : Response) => {
	res.send("Hello World!");
})

app.use("/seller", sellerRouter)
app.use("/product", productRouter)
app.use("/order", orderRouter)

// Connect to the database and start the server.
mongoose.connect(uri).then(() => {
    app.listen(port, ():void => {
        console.log('Restapi listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
})


