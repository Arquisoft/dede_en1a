import {Order} from "../shared/shareddtypes";

export async function getOrdersForUser(webId: string | null):Promise<Order[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000";
    console.log(apiEndPoint);
    let response = await fetch(apiEndPoint + "/order/list/" + webId);
    console.log(response);
    return response.json();
}
