import {Order} from "../shared/shareddtypes";

export async function getOrdersForUser(webId: string):Promise<Order[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000";
    let response = await fetch(apiEndPoint + "/order/list/user/" + encodeURIComponent(webId));
    return response.json();
}

export async function getOrders():Promise<Order[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000";
    let response = await fetch(apiEndPoint + "/order/list");
    return response.json();
}
