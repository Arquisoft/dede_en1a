import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import sellerRouter from '../routers/SellerRouter';
import productRouter from "../routers/ProductRouter";
import orderRouter from "../routers/OrderRouter";
import mongoose from "mongoose";

let app:Application;
let server:http.Server;

jest.setTimeout(15000)

beforeAll(async () => {
    app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };
    app.use(cors());
    app.use(bp.json());
    app.use("/seller", sellerRouter)
    app.use("/product", productRouter)
    app.use("/order", orderRouter)

    mongoose.connect('mongodb+srv://cluster0.2sj0r.mongodb.net/', {
        dbName: "DeDe_Database",
        user: "admin",
        pass: "admin",
        retryWrites: true,
        w: 'majority'
    }).then(() => {
        console.log("connected to database: " + "DeDe_Database");
    }).catch(err => {
        console.error('Error occured: ' + err.message);
    })

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occurred: ' + error.message);
    });

});

afterAll(async () => {
    server.close() //close the server
})

describe('product ', () => {
    let sellerId: string = "622e4a53fb178d9622251286";
    let newCreatedProductId:string;

    it('can be created correctly', async () => {
        let name:string = 'TestHammer1';
        let price:number = 20;
        let description:string = 'This is a hammer. There are many like it, but this one is mine.'
        let image:string = 'thisShouldBeAnImage';
        let weight:number = 8;
        const response:Response = await request(app)
            .post('/seller/addProduct/' + sellerId)
            .send({name: name, price: price, description: description, image: image, weight: weight})
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        newCreatedProductId = response.body._id;
    });

    it('can be listed',async () => {
        const response:Response = await request(app).get("/product/list");
        expect(response.statusCode).toBe(200);
    });

    it('can be deleted', async () => {
        const response:Response = await request(app)
            .post("/seller/deleteProduct/"+sellerId)
            .send({id: newCreatedProductId})
            .set("Accept", "application/json");
        expect(response.statusCode).toBe(200);
    })

});

describe("order ", () => {
    it ("can be listed", async () => {
        const response:Response = await request(app).get("/order/list");
        expect(response.statusCode).toBe(200);
    })
})

describe("seller ", () => {
    let customSellerId:string;

    it("can be created", async() => {
        let seller = {name: "sellerOne", products: []};

        const response:Response = await request(app)
            .post("/seller/add")
            .send(seller)
            .set("Accept", "application/json");
        expect(response.statusCode).toBe(200);
        customSellerId = response.body._id;
    })

    it("can be listed", async() => {
        const response:Response = await request(app).get("/seller/list");
        expect(response.statusCode).toBe(200);
    })

    it("can be deleted", async() => {
        const response:Response = await request(app).get("/seller/delete/"+customSellerId);
        expect(response.statusCode).toBe(200);
    })
})