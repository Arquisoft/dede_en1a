import {useEffect, useState} from "react";
import {Order} from "../shared/shareddtypes";
import {getOrdersForUser} from "../api/api";

const useOrdersByUser = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    let webId: string | null = localStorage.getItem("webID");

    const getOrders = async () => {
        setOrders(await getOrdersForUser(webId));
    }

    useEffect(() => {
        getOrders()
    }, []);

    return orders;
}

export default useOrdersByUser;