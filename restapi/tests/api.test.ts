import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import userRouter from '../routers/userRouter';
import productRouter from "../routers/ProductRouter";
import orderRouter from "../routers/OrderRouter";

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
beforeEach(async () => {
	await testDbHandler.createAdmin()

})

afterEach( async () => {
	await testDbHandler.clearDatabase();
})

afterAll(async () => {
    await testDbHandler.closeDatabase();
    server.close() //close the server
})

describe('user', () => {
	it('can be signed up', async () => {
		let user = {
			webId: "test",
			password: "1234"
		}
		const response = await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')
		expect(response.statusCode).toBe(200)
	})

	it('can not be signed up with an empty webId', async () => {
		let user = {
			webId: "",
			password: "1234"
		}
		const response = await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')
		expect(response.statusCode).toBe(422)
	})

	it('can not be signed up with an empty password', async () => {
		let user = {
			webId: "asd",
			password: ""
		}
		const response = await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')
		expect(response.statusCode).toBe(422)
	})

	it('can not be signed up with a repeated webId', async () => {
		let user = {
			webId: "test",
			password: "1234"
		}
		await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')

		const response = await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')
		expect(response.statusCode).toBe(409)
	})


	it('can log in', async () => {
		let user = {
			webId: "test",
			password: "1234"
		}
		await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')

		const response = await request(app)
			.post('/user/login')
			.send(user)
			.set('Accept', 'application/json')
		expect(response.statusCode).toBe(200)
	})


	it('can be deleted by admin', async () => {
		let user = {
			webId: "test",
			password: "1234"
		}
		await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')

		let {body} = await request(app)
			.post('/user/login')
			.send({webId: 'admin', password: 'admin'})
			.set('Accept', 'application/json')

		let {statusCode} = await request(app)
			.get('/user/delete/test')
			.set({'Accept': 'application/json', 'auth': body.token})

		expect(statusCode).toBe(200)
	})

	it('can be listed by admin', async () => {

		let {body} = await request(app)
			.post('/user/login')
			.send({webId: 'admin', password: 'admin'})
			.set('Accept', 'application/json')

		let {statusCode} = await request(app)
			.get('/user/list')
			.set({'Accept': 'application/json', 'auth': body.token})

		expect(statusCode).toBe(200)
	})

	it('can show details by admin', async () => {
		let user = {
			webId: "test",
			password: "1234"
		}
		await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')

		let {body} = await request(app)
			.post('/user/login')
			.send({webId: 'admin', password: 'admin'})
			.set('Accept', 'application/json')

		let {statusCode} = await request(app)
			.get('/user/details/test')
			.set({'Accept': 'application/json', 'auth': body.token})

		expect(statusCode).toBe(200)
	})

	it('can not be deleted by seller', async () => {
		let user = {
			webId: "test",
			password: "1234"
		}
		await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')

		let {body} = await request(app)
			.post('/user/signup')
			.send({webId: 'seller', password: 'seller'})
			.set('Accept', 'application/json')

		let {statusCode} = await request(app)
			.get('/user/delete/test')
			.set({'Accept': 'application/json', 'auth': body.token})

		expect(statusCode).toBe(401)
	})

	it('can not be listed by seller', async () => {

		let {body} = await request(app)
			.post('/user/signup')
			.send({webId: 'seller', password: 'seller'})
			.set('Accept', 'application/json')

		let {statusCode} = await request(app)
			.get('/user/list')
			.set({'Accept': 'application/json', 'auth': body.token})

		expect(statusCode).toBe(401)
	})

	it('can not show details by seller', async () => {
		let user = {
			webId: "test",
			password: "1234"
		}
		await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')
			
		let {body} = await request(app)
			.post('/user/signup')
			.send({webId: 'seller', password: 'seller'})
			.set('Accept', 'application/json')

		let {statusCode} = await request(app)
			.get('/user/details/test')
			.set({'Accept': 'application/json', 'auth': body.token})

		expect(statusCode).toBe(401)
	})

	it('can not be deleted without token', async () => {
		let user = {
			webId: "test",
			password: "1234"
		}
		await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')

		let {statusCode} = await request(app)
			.get('/user/delete/test')
			.set({'Accept': 'application/json'})

		expect(statusCode).toBe(401)
	})

	it('can not be listed without token', async () => {


		let {statusCode} = await request(app)
			.get('/user/list')
			.set({'Accept': 'application/json'})

		expect(statusCode).toBe(401)
	})

	it('can not show details without token', async () => {
		let user = {
			webId: "test",
			password: "1234"
		}
		await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')


		let {statusCode} = await request(app)
			.get('/user/details/test')
			.set({'Accept': 'application/json'})

		expect(statusCode).toBe(401)
	})

})

describe('product', () => {
    let newCreatedProductId:string;

	it('can not be added without token', async () => {
		
		let prod = {
			name: "prod",
			price: 10,
			description: "prod",
			image: "prod"
		}

		const {statusCode} = await request(app)
			.post('/product/add')
			.send(prod)
			.set({'Accept': 'application/json'})
		
		expect(statusCode).toBe(401)
	})

	it('can be added', async () => {
		let user = {
			webId: "test",
			password: "1234"
		}
		const {body} = await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')
		
		let prod = {
			name: "prod",
			price: 10,
			description: "prod",
			image: "prod"
		}

		const {statusCode} = await request(app)
			.post('/product/add')
			.send(prod)
			.set({'Accept': 'application/json', 'auth': body.token})
		
		expect(statusCode).toBe(200)
	})

	it('can be deleted', async () => {
		let user = {
			webId: "test",
			password: "1234"
		}
		const {body} = await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')
		
		let prod = {
			name: "prod",
			price: 10,
			description: "prod",
			image: "prod"
		}

		const responseAdd = await request(app)
			.post('/product/add')
			.send(prod)
			.set({'Accept': 'application/json', 'auth': body.token})
		
		const {statusCode} = await request(app)
			.get('/product/delete/' + responseAdd.body._id)
			.send(prod)
			.set({'Accept': 'application/json', 'auth': body.token})
		
		expect(statusCode).toBe(200)
	})

	it('can not be deleted without token', async () => {
		let user = {
			webId: "test",
			password: "1234"
		}
		const {body} = await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')

		let prod = {
			name: "prod",
			price: 10,
			description: "prod",
			image: "prod"
		}

		const responseAdd = await request(app)
			.post('/product/add')
			.send(prod)
			.set({'Accept': 'application/json', 'auth': body.token})
		
		const {statusCode} = await request(app)
			.get('/product/delete/' + responseAdd.body._id)
			.send(prod)
			.set({'Accept': 'application/json'})
		
		expect(statusCode).toBe(401)
	})

	it('can be deleted by admin', async () => {
		let user = {
			webId: "test",
			password: "1234"
		}
		let responseLogin = await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')

		let prod = {
			name: "prod",
			price: 10,
			description: "prod",
			image: "prod"
		}

		const responseAdd = await request(app)
			.post('/product/add')
			.send(prod)
			.set({'Accept': 'application/json', 'auth': responseLogin.body.token})


		responseLogin = await request(app)
			.post('/user/login')
			.send({webId: 'admin', password: 'admin'})
			.set('Accept', 'application/json')
		
		const {statusCode} = await request(app)
			.get('/product/delete/' + responseAdd.body._id)
			.send(prod)
			.set({'Accept': 'application/json', 'auth': responseLogin.body.token})
		
		expect(statusCode).toBe(200)
	})


	it('can not be deleted by other user', async () => {
		let user = {
			webId: "test",
			password: "1234"
		}
		let responseLogin = await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')

		let prod = {
			name: "prod",
			price: 10,
			description: "prod",
			image: "prod"
		}

		const responseAdd = await request(app)
			.post('/product/add')
			.send(prod)
			.set({'Accept': 'application/json', 'auth': responseLogin.body.token})

		user.webId = "test2"

		responseLogin = await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')
		
		const {statusCode} = await request(app)
			.get('/product/delete/' + responseAdd.body._id)
			.send(prod)
			.set({'Accept': 'application/json', 'auth': responseLogin.body.token})
		
		expect(statusCode).toBe(401)
	})

	it('can be updated', async () => {

		let user = {
			webId: "test",
			password: "1234"
		}
		const {body} = await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')
		
		let prod = {
			name: "prod",
			price: 10,
			description: "prod",
			image: "prod"
		}

		const responseAdd = await request(app)
			.post('/product/add')
			.send(prod)
			.set({'Accept': 'application/json', 'auth': body.token})


		prod.name = 'updated'
		
		await request(app)
			.post('/product/update/' + responseAdd.body._id)
			.send(prod)
			.set({'Accept': 'application/json', 'auth': body.token})

		const response = await request(app)
			.get('/product/details/' + responseAdd.body._id)
			.set({'Accept': 'application/json', 'auth': body.token})
		
		expect(response.statusCode).toBe(200)
		expect(response.body.name).toBe(prod.name)
	})
    it('can not be updated without token', async () => {

		let user = {
			webId: "test",
			password: "1234"
		}
		const {body} = await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')
		
		let prod = {
			name: "prod",
			price: 10,
			description: "prod",
			image: "prod"
		}

		const responseAdd = await request(app)
			.post('/product/add')
			.send(prod)
			.set({'Accept': 'application/json', 'auth': body.token})


		prod.name = 'updated'
		
		const responseUpdate = await request(app)
			.post('/product/update/' + responseAdd.body._id)
			.send(prod)
			.set({'Accept': 'application/json'})
		expect(responseUpdate.statusCode).toBe(401)

		const response = await request(app)
			.get('/product/details/' + responseAdd.body._id)
			.set({'Accept': 'application/json', 'auth': body.token})
		
		expect(response.statusCode).toBe(200)
		expect(response.body.name).toBe("prod")
	})

	it('can be updated by admin', async () => {

		let user = {
			webId: "test",
			password: "1234"
		}
		let responseLogin = await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')
		
		let prod = {
			name: "prod",
			price: 10,
			description: "prod",
			image: "prod"
		}

		const responseAdd = await request(app)
			.post('/product/add')
			.send(prod)
			.set({'Accept': 'application/json', 'auth': responseLogin.body.token})
		responseLogin = await request(app)
			.post('/user/login')
			.send({webId: 'admin', password: 'admin'})
			.set('Accept', 'application/json')

		prod.name = 'updated'
		
		const responseUpdate = await request(app)
			.post('/product/update/' + responseAdd.body._id)
			.send(prod)
			.set({'Accept': 'application/json', 'auth': responseLogin.body.token})
		expect(responseUpdate.statusCode).toBe(200)

		const response = await request(app)
			.get('/product/details/' + responseAdd.body._id)
			.set({'Accept': 'application/json', 'auth': responseLogin.body.token})
		
		expect(response.statusCode).toBe(200)
		expect(response.body.name).toBe(prod.name)
	})

	it('can not be updated by other user', async () => {

		let user = {
			webId: "test",
			password: "1234"
		}
		let responseLogin = await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')
		
		let prod = {
			name: "prod",
			price: 10,
			description: "prod",
			image: "prod"
		}

		const responseAdd = await request(app)
			.post('/product/add')
			.send(prod)
			.set({'Accept': 'application/json', 'auth': responseLogin.body.token})
		user.webId = "test2"
		responseLogin = await request(app)
			.post('/user/signup')
			.send(user)
			.set('Accept', 'application/json')

		prod.name = 'updated'
		
		const responseUpdate = await request(app)
			.post('/product/update/' + responseAdd.body._id)
			.send(prod)
			.set({'Accept': 'application/json', 'auth': responseLogin.body.token})
		expect(responseUpdate.statusCode).toBe(401)

		const response = await request(app)
			.get('/product/details/' + responseAdd.body._id)
			.set({'Accept': 'application/json', 'auth': responseLogin.body.token})
		
		expect(response.statusCode).toBe(200)
		expect(response.body.name).toBe("prod")
	})

    it('can be listed',async () => {
        const response:Response = await request(app).get("/product/list");
        expect(response.statusCode).toBe(200);
    });

});

describe("order", () => {
    it ("can be listed", async () => {
        const response:Response = await request(app).get("/order/list");
        expect(response.statusCode).toBe(200);
    })

	it ("can be listed by webId", async () => {
        const response:Response = await request(app).get("/order/list/user/admin");
        expect(response.statusCode).toBe(200);
    })

	it('can be added', async () => {
		let order = {
			webId: 'test',
			address: 'test',
			name: 'test',
			shippingPrice: 10,
			totalPrice: 10,

			products: [
				{product: 'asdad', amount: 10},
				{product: 'asdfd', amount: 10},
				{product: 'asdfdfd', amount: 10}
			]
		}
		const {statusCode} = await request(app)
			.post('/order/add')
			.send(order)
			.set('Accept', 'application/json')
		expect(statusCode).toBe(200)
	})

	it('can show details', async () => {
		let order = {
			webId: 'test',
			address: 'test',
			name: 'test',
			shippingPrice: 10,
			totalPrice: 10,

			products: [
				{product: 'asdad', amount: 10},
				{product: 'asdfd', amount: 10},
				{product: 'asdfdfd', amount: 10}
			]
		}
		const {body} = await request(app)
			.post('/order/add')
			.send(order)
			.set('Accept', 'application/json')

		const {statusCode} = await request(app)
			.get('/order/details/' + body._id)
			.set('Accept', 'application/json')
			
		expect(statusCode).toBe(200)
	})

	it('can be deleted by admin', async () => {
		let order = {
			webId: 'test',
			address: 'test',
			name: 'test',
			shippingPrice: 10,
			totalPrice: 10,

			products: [
				{product: 'asdad', amount: 10},
				{product: 'asdfd', amount: 10},
				{product: 'asdfdfd', amount: 10}
			]
		}
		let responseAdd = await request(app)
			.post('/order/add')
			.send(order)
			.set('Accept', 'application/json')

		let {body} = await request(app)
			.post('/user/login')
			.send({webId: 'admin', password: 'admin'})
			.set('Accept', 'application/json')

		let {statusCode} = await request(app)
			.get('/order/delete/' + responseAdd.body._id)
			.set({'Accept': 'application/json', 'auth': body.token})
		
		expect(statusCode).toBe(200)
	})

	it('can be updated by admin', async () => {
		let order = {
			webId: 'test',
			address: 'test',
			name: 'test',
			shippingPrice: 10,
			totalPrice: 10,

			products: [
				{product: 'asdad', amount: 10},
				{product: 'asdfd', amount: 10},
				{product: 'asdfdfd', amount: 10}
			]
		}
		let responseAdd = await request(app)
			.post('/order/add')
			.send(order)
			.set('Accept', 'application/json')

		order.products[1].amount = 122

		let {body} = await request(app)
			.post('/user/login')
			.send({webId: 'admin', password: 'admin'})
			.set('Accept', 'application/json')

		let {statusCode} = await request(app)
			.post('/order/update/' + responseAdd.body._id)
			.send(order)
			.set({'Accept': 'application/json', 'auth': body.token})
		
		expect(statusCode).toBe(200)
	})

	it('can not be deleted by seller', async () => {
		let order = {
			webId: 'test',
			address: 'test',
			name: 'test',
			shippingPrice: 10,
			totalPrice: 10,

			products: [
				{product: 'asdad', amount: 10},
				{product: 'asdfd', amount: 10},
				{product: 'asdfdfd', amount: 10}
			]
		}
		let responseAdd = await request(app)
			.post('/order/add')
			.send(order)
			.set('Accept', 'application/json')

		let {body} = await request(app)
			.post('/user/signup')
			.send({webId: 'test', password: 'test'})
			.set('Accept', 'application/json')

		let {statusCode} = await request(app)
			.get('/order/delete/' + responseAdd.body._id)
			.set({'Accept': 'application/json', 'auth': body.token})
		
		expect(statusCode).toBe(401)
	})

	it('can be updated by admin', async () => {
		let order = {
			webId: 'test',
			address: 'test',
			name: 'test',
			shippingPrice: 10,
			totalPrice: 10,

			products: [
				{product: 'asdad', amount: 10},
				{product: 'asdfd', amount: 10},
				{product: 'asdfdfd', amount: 10}
			]
		}
		let responseAdd = await request(app)
			.post('/order/add')
			.send(order)
			.set('Accept', 'application/json')

		order.products[1].amount = 122

		let {body} = await request(app)
			.post('/user/signup')
			.send({webId: 'test', password: 'test'})
			.set('Accept', 'application/json')

		let {statusCode} = await request(app)
			.post('/order/update/' + responseAdd.body._id)
			.send(order)
			.set({'Accept': 'application/json', 'auth': body.token})
		
		expect(statusCode).toBe(401)
	})
})