import express, { Request, Response, Router } from 'express';
import productRouter from './routers/ProductRouter';

const api:Router = express.Router();


api.get('/', (req: Request, res: Response) => {
	res.send("Hello World")
});

api.use("/product", productRouter);


export default api;    