import * as React from 'react';
import {getOrdersForUser, getProductById} from "../../api/api";
import {useEffect, useState} from "react";
import {Order} from "../../shared/shareddtypes";
import {useSession} from "@inrupt/solid-ui-react";
import OrderItem from "../../components/order/OrderItem";
import styles from "./OrdersPage.module.scss";
import moment from "moment";

function OrdersPage(): JSX.Element {
    const [orders, setOrders] = useState<Order[]>([]);
    const {session} = useSession();

    const refreshOrderList = async () => {
        setOrders(await getOrdersForUser(session.info.webId + ""));
    };

    useEffect(() => {
        refreshOrderList();
    }, []);

    let orderList: JSX.Element[] = [];

    if (orders != null || orders != undefined) {
        console.log(orders)
        orders.forEach((order) => {
            console.log(order)
            let group: JSX.Element[] = [];
            order.products.forEach(async (product) => {
                let prod = await getProductById(product.product_id);
                group.push(
                    <div className={styles.order}>
                        <OrderItem orderItem={prod} amount={product.number}/>
                    </div>
                );
            });
            let dateOrder = new Date(order.createdAt);
            orderList.push(
                <div className={styles.orderwrapper}>
                    <div className={styles.ordersname}>
                        Date: {moment(dateOrder).format("YYYY-MM-DD HH:MM:SS")}
                    </div>
                    <div className={styles.ordersname}>Address: {order.address}</div>
                    <div className={styles.ordersname}>
                        Total: {order.totalPrice}€
                    </div>
                    <div>{group}</div>
                </div>
            );
        });
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.title}>Your Order(s)</div>
                <div className={styles.ordercarditemcontainer}>{orderList}</div>
            </div>
        </>
    );

}

export default OrdersPage;