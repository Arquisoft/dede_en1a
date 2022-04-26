import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import userRouter from '../routers/userRouter';
import productRouter from "../routers/ProductRouter";
import orderRouter from "../routers/OrderRouter";

const mongoose = require("mongoose");
const testDbHandler = require("./test-db-handler");

let app:Application;
let server:http.Server;

jest.setTimeout(15000)

beforeAll(async () => {
    app = express();
    const port: number = 5000;
    app.use(cors());
    app.use(bp.json());
    app.use("/user", userRouter)
    app.use("/product", productRouter)
    app.use("/order", orderRouter)

    await testDbHandler.connect();

    console.log("after connect")
    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occurred: ' + error.message);
    });

});

afterEach( async () => {
    await testDbHandler.clearDatabase();
})

afterAll(async () => {
    await testDbHandler.closeDatabase();
    await server.close() //close the server
})

describe('product', () => {
    let sellerId: string = "622e4a53fb178d9622251286";
    let newCreatedProductId:string;

    it('can be created correctly', async () => {
        let name:string = 'testProduct';
        let price:number = 21;
        let description:string = 'Product for testing purposes.'
        let image:string = 'thisShouldBeAnImage';
        let weight:number = 7;
        const response:Response = await request(app)
            .post('/product/add/')
            .send({name: name, price: price, description: description, image: image, seller_id: sellerId})
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
            .get("/product/delete/"+newCreatedProductId)
            .set("Accept", "application/json");
        expect(response.statusCode).toBe(200);
    })

});

describe("order", () => {
    it ("can be listed", async () => {
        const response:Response = await request(app).get("/order/list");
        expect(response.statusCode).toBe(200);
    })
})

describe("user", () => {
    let customUserId:string;

    it("can be created", async() => {
        let user = {
            webId: "web.id.ew",
            name: "sellerOne",
            role: "SELLER"};

        const response:Response = await request(app)
            .post("/user/add")
            .send(user)
            .set("Accept", "application/json");
        expect(response.statusCode).toBe(200);
        customUserId = response.body._id;
    })

    it("can be listed", async() => {
        const response:Response = await request(app).get("/user/list");
        expect(response.statusCode).toBe(200);
    })

    it("can be deleted", async() => {
        const response:Response = await request(app).get("/user/delete/" + customUserId);
        expect(response.statusCode).toBe(200);
    })
})