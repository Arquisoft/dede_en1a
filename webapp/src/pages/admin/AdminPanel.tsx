import React from "react";
import useFetch from "../../hooks/useFetch";
import {Order, Product} from "../../shared/shareddtypes";
import Grid from "@mui/material/Grid";
import {Button, Typography} from "@mui/material";
import Axios from "axios";
import useOrders from "../../hooks/useOrders";
import moment from "moment";
import {useHistory} from "react-router-dom";


function AdminPanel(): JSX.Element {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000";
    const history = useHistory();

    const addProduct = () => {
        history.push("/admin/addProduct");
    }

    const deleteProduct = (_id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            Axios.post(apiEndPoint + '/product/delete/' + _id);
        }
    }

    const deleteOrder = (_id: string) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            Axios.post(apiEndPoint + '/order/delete/' + _id);
        }
    }

    const Products = () => {
        const {products} = useFetch();

        products.map((product: Product) => {
            return (
                <Grid key={product._id} item container xs={12} sm={6} md={4} lg={3}>
                    <img className="product-image" src={product.image} alt={product.name}/>
                    <div className="product-cart-description-container">
                        <div className="row1">
                            <div className="product-name">{product.name}</div>
                            <div className="price">{product.price + "€"}</div>
                        </div>
                    </div>
                    <Button onClick={() => deleteProduct(product._id)}>Delete</Button>
                </Grid>
            )
        });
    }

    const Orders = () => {
        const {orders} = useOrders();

        orders.map((order: Order) => {
            let dateOrder = new Date(order.createdAt);
            return (
                <Grid key={order._id} item container xs={12} sm={6} md={4} lg={3}>
                    <div className="product-cart-description-container">
                        <div className="row1">
                            <Typography component='div' variant='body1'>
                                Date: {moment(dateOrder).format("YYYY-MM-DD HH:MM:SS")}
                            </Typography>
                            <Typography component='div' variant='body1'>
                                Address: {order.address}
                            </Typography>
                        </div>
                    </div>
                    <Button onClick={() => deleteOrder(order._id)}>Delete</Button>
                </Grid>
            )
        });
    }

    return (
        <>
            <Typography variant="h2" align="center">Admin panel</Typography>
            {Products}
            <Button onClick={addProduct}>Add product</Button>
            {Orders}
        </>
    );
}

export default AdminPanel;