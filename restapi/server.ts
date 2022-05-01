import express, { Application, RequestHandler, Request, Response } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import mongoose from "mongoose";

import userRouter from "./routers/userRouter";
import productRouter from "./routers/ProductRouter";
import orderRouter from "./routers/OrderRouter";
import solidRouter from "./solid/solidRouter";
import geocoderRouter from "./routers/geocoderRouter";


import 'dotenv/config'
import authRouter from "./routers/authrouter";



const app: Application = express(); 
const options: cors.CorsOptions = {
	origin: ['http://localhost:3000']
};


const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});

app.use(metricsMiddleware);
//app.use(cors(options));
app.use(cors());
app.use(bp.json());

app.use("/user", userRouter)
app.use("/product", productRouter)
app.use("/order", orderRouter)
app.use("/solid", solidRouter)
app.use("/geocode", geocoderRouter)
app.use("/token:webId", authRouter)


// Connect to the server
const server = app.listen(process.env.RESTAPI_PORT, () => {
	console.log('Restapi listening on '+ process.env.RESTAPI_PORT);
}).on("error", (error:Error) => {
	console.error('Error occurred: ' + error.message);
});

// start the database
mongoose.connect('mongodb+srv://cluster0.2sj0r.mongodb.net/', {
		dbName: process.env.RESTAPI_DB_NAME,
		user: process.env.RESTAPI_DB_USERNAME,
		pass: process.env.RESTAPI_DB_PASSWORD,
		retryWrites: true,
		w: 'majority'
	}).then((result) => {
		console.log("connected to database: " + result.connection.name);
	}).catch(err => {
		console.error('Error occured: ' + err.message);
		server.close(() => {
			console.log("closing server")
		})
		mongoose.connection.close()
	})
//