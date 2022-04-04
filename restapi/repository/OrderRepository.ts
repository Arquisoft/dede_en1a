import IOrder from "../interfaces/OrderInterface";
import Order from "../schemas/OrderSchema";

export async function findAllOrders() {
    return await Order.find({});
}

export async function findOrderById(id: string) {
    return Order.findById(id);
}

export async function findOrderByWebId(webid: string) {
    return await Order.find({'webid': webid})
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
