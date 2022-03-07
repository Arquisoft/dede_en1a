import IOrder from "../interfaces/OrderInterface";
import Order from "../schemas/OrderSchema";

export async function findAllOrders() {
    return await Order.find({});
}

export async function findOrderById(id: String) {
    return await Order.findById(id);
}

export async function updateOrder(id: String, product: IOrder) {
    return await Order.findByIdAndUpdate(id, product);
}

export async function createOrder(product: IOrder) {
    const prod = new Order(product);
    return await prod.save();
}

export async function deleteOrder(id: String) {
    return await Order.findByIdAndDelete(id);
}