import IOrder from "../interfaces/OrderInterface";
import Order from "../schemas/OrderSchema";

export async function findAllOrders() {
    return await Order.find({});
}

export async function findOrderById(id: string) {
    return Order.findById(id);
}

export async function findOrderByWebId(webId: string) {
    return await Order.find({'webId': webId})
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
