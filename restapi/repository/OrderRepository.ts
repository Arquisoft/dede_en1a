import IOrder from "../interfaces/OrderInterface";
import Order from "../schemas/OrderSchema";
import IProduct from "../interfaces/ProductInterface";
import Product from "../schemas/ProductSchema";

export async function findAllOrders() {
    return await Order.find({});
}

export async function findOrderById(id: string) {
    return await Order.findById(id);
}

export async function findOrderByWebId(webid: string) {
    return await Order.find({'weibid': webid})
}

export async function updateOrder(id: string, product: IOrder) {
    return await Order.findByIdAndUpdate(id, product);
}

export async function createOrder(product: IOrder) {
    const prod = new Order(product);
    return await prod.save();
}

export async function deleteOrder(id: string) {
    return await Order.findByIdAndDelete(id);
}

export async function addProduct(id: string, productId: string, amount: Number) {

	let order = await findOrderById(id);
	console.log(order);
	return order;
}