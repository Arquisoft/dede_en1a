import express, { Application, RequestHandler, Request, Response } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import mongoose from "mongoose";

import sellerRouter from "./routers/SellerRouter";
import productRouter from "./routers/ProductRouter";
import orderRouter from "./routers/OrderRouter";
import solidRouter from "./solid/solidRouter";
import geocoderRouter from "./routers/geocoderRouter";


import 'dotenv/config'


const app: Application = express(); 
const options: cors.CorsOptions = {
	origin: ['http://localhost:3000']
};

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});

app.use(metricsMiddleware);
//app.use(cors(options));
app.use(cors());
app.use(bp.json());



app.use("/seller", sellerRouter)
app.use("/product", productRouter)
app.use("/order", orderRouter)
app.use("/solid", solidRouter)
app.use("/geocode", geocoderRouter)


// Connect to the database and start the server.
mongoose.connect('mongodb+srv://cluster0.2sj0r.mongodb.net/', {
		dbName: process.env.RESTAPI_DB_NAME,
		user: process.env.RESTAPI_DB_USERNAME,
		pass: process.env.RESTAPI_DB_PASSWORD,
		retryWrites: true,
		w: 'majority'
	}).then(() => {
		console.log("connected to database: " + process.env.RESTAPI_DB_NAME);
	}).catch(err => {
		console.error('Error occured: ' + err.message);
	})
	
app.listen(process.env.RESTAPI_PORT, ():void => {
		console.log('Restapi listening on '+ process.env.RESTAPI_PORT);
	}).on("error", (error:Error) => {
		console.error('Error occured: ' + error.message);
	});
			
//