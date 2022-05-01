import { ConstructionOutlined } from "@mui/icons-material";
import {Order, Product} from "../shared/shareddtypes";

export async function getOrdersForUser(webId: string):Promise<Order[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000";
    let response = await fetch(apiEndPoint + "/order/list/user/" + encodeURIComponent(webId));
    return response.json();
}

export async function getProductById(id: string):Promise<Product> {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000";
    let response = await fetch(apiEndPoint + "/product/details/" + id);
    return response.json();
}
