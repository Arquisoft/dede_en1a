import {Order} from "../shared/shareddtypes";

export async function getOrdersForUser(webId: string): Promise<Order[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000";
    let response = await fetch(apiEndPoint + "/order/list/user/" + encodeURIComponent(webId));
    return response.json();
}

export async function getOrders(): Promise<Order[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000";
    let response = await fetch(apiEndPoint + "/order/list");
    return response.json();
}

export async function deleteProduct(id: string): Promise<boolean> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
    let response = await fetch(apiEndPoint + '/product/' + id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') as string},

    });
    return response.status === 200;
}

export async function deleteOrder(id: string): Promise<boolean> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
    let response = await fetch(apiEndPoint + '/order/' + id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') as string},

    });
    return response.status === 200;
}