import {getOrdersForUser} from "../../api/api";
import React, {useEffect, useState} from "react";
import {Order} from "../../shared/shareddtypes";
import {useSession} from "@inrupt/solid-ui-react";
import moment from "moment";
import {Box, Divider, Grid, List, ListItem, Typography} from '@mui/material';
import {Footer} from "../../components/footer/Footer";


const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const {session} = useSession();

    const refreshOrderList = async () => {
        setOrders(await getOrdersForUser(session.info.webId + ""));
    };

    useEffect(() => {
        refreshOrderList();
    }, []);


    let orderList: JSX.Element[] = [];

    if (orders != null || orders !== undefined) {
        orders.forEach((order) => {

            let dateOrder = new Date(order.createdAt);
            orderList.push(
                <><Box display="grid">
                    <List key={order._id}>
                        <ListItem>
                            <Typography component='div' fontFamily="Georgia" variant='h5'>
                                Order: {order._id}
                            </Typography>
                        </ListItem>
                        <Divider/>
                        <Typography component='div' variant='body1'>
                            Date: {moment(dateOrder).format("YYYY-MM-DD HH:MM:SS")}
                        </Typography>
                        <Typography component='div' variant='body1'>
                            Address: {order.address}
                        </Typography>
                        <Typography component='div' variant='body1'>
                            Shipping: {order.shippingPrice}€
                        </Typography>
                        <Typography component='div' align="right" variant='h6'>
                            Total: {order.totalPrice}€
                        </Typography>
                    </List>
                </Box><Divider/></>
            );
        });
    }

    return (
        <><Grid container spacing={0} direction="column" alignItems="center">
            <Typography variant="h2">
                Your order(s):
            </Typography>
            <List>
                {orderList}
            </List>
        </Grid><Footer/></>
    );

}

export default OrdersPage;