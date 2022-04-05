import {getOrdersForUser, getProductById} from "../../api/api";
import {useEffect, useState} from "react";
import {Order, Product} from "../../shared/shareddtypes";
import {useSession} from "@inrupt/solid-ui-react";
import moment from "moment";
import { Divider, Grid, List, ListItem, Typography } from '@mui/material';


function getProductItem(products: Product[]) :JSX.Element {
	console.log(products)
	return (
		<>
			{products.map(x => {
				<div>
					{x.name}
				</div>
			})}
		</>
	)
}

function getListItem(order: Order, products : Product[]) {
	let dateOrder = new Date(order.createdAt);
	let productItems = getProductItem(products)
	return (
		<>
			<ListItem>
				<List>
					<ListItem>
						<Typography component='div' variant='h5'>
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
					{productItems}
				</div>
			</ListItem>
			<Divider></Divider>
		</>
	)
}

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
        orders.forEach((order) => {
<<<<<<< HEAD
			let prods : Product[] = []

            order.products.forEach(async (product) => {
                let prod = await getProductById(product.product);
                prods.push(prod)
=======
            console.log(order);
            let group: JSX.Element[] = [];
            order.products.forEach(async (product) => {
                let prod = await getProductById(product.prod + "");
                console.log(prod);
                group.push(
                    <>
                    <div className={styles.order}>
                        <OrderItem product={prod} amount={product.number}/>
                    </div>
                    </>
                );
>>>>>>> 49420779c0d7343065c6160c93105001b1567ce5
            });
			
            orderList.push(getListItem(order, prods))
				
        });
    }

    return (
        <>
            {/* <div className={styles.header}>
                <div className={styles.title}>Your Order(s)</div>
                <div className={styles.ordercarditemcontainer}>{orderList}</div>
            </div> */}
			<Grid container spacing={0} direction="column" alignItems="center">
				<Typography variant="h2">
					Orders:
				</Typography>
				<List>
					{orderList}
				</List>
			</Grid>
        </>
    );

}

export default OrdersPage;