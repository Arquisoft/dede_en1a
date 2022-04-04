import { useEffect, useState } from "react";
import {Order, OrdersFetch} from "../shared/shareddtypes";
import {getOrdersForUser} from "../api/api";

const useOrders = () => {

    const [data, setData] = useState<OrdersFetch>({
        orders: [],
        isLoading: true,
        isError: false
    });


    useEffect(() => {

        getOrdersForUser(localStorage.getItem("webID"))
            .then(data => {

                const customData = data.map((order: Order) => ({ ...order}));

                setData({
                    orders: customData,
                    isLoading: false,
                    isError: false
                })
            })
            .catch(err => {
                setData({
                    orders: [],
                    isLoading: false,
                    isError: true
                })
            })

    },[]);

    return data;
}

export default useOrders;