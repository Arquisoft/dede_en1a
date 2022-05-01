import {getOrdersForUser} from "../../api/api";
import {useEffect, useState} from "react";
import {Order} from "../../shared/shareddtypes";
import {useSession} from "@inrupt/solid-ui-react";
import moment from "moment";
import {Divider, Grid, List, ListItem, Typography} from '@mui/material';
import Axios from "axios";


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

    if (orders != null || orders !== undefined) {
        orders.forEach((order) => {
            let group: JSX.Element[] = [];

            order.products.forEach(async (product) => {
                const apiEndPoint = process.env.REACT_APP_API_URI;
                Axios.get(apiEndPoint + '/product/details/' + product.prod).then(
					response => {
                        let prod = response.data;
                        // console.log(prod);
                        group.push(
                            <>
                                <div key={prod._id} className="product-cart-container">
                                    <img className="product-image" src={prod.image}  alt={prod.name}/>
                                    <div className="product-cart-description-container">
                                        <div className="row1">
                                            <div className="product-name">{prod.name}</div>
                                            <div className="product-amount">x{product.amount}</div>
                                            <div className="price">{prod.price + "€"}</div>
                                        </div>
                                    </div>
                                </div>
                                {/*<OrderItem key={prod._id} product={prod} amount={product.amount}/>*/}
                            </>
                        );
                    }
                );
            });
            let dateOrder = new Date(order.createdAt);
            orderList.push(
                <><ListItem>
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
                    <div>
                        {group}
                    </div>
                </ListItem><Divider/></>
            );
        });
    }

    return (
        <>
            <Grid container spacing={0} direction="column" alignItems="center">
                <Typography variant="h2">
                    Your order(s):
                </Typography>
                <List>
                    {orderList}
                </List>
            </Grid>
        </>
    );

}

export default OrdersPage;