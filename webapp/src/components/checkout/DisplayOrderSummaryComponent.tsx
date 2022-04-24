import {Box, Grid, Paper, Typography} from "@mui/material";
import React, {FormEvent, useContext, useEffect, useState} from "react";
import {CartContext} from "../../context/CartContext";
import {Address, OrderAdd} from "../../shared/shareddtypes";
import {useSession} from "@inrupt/solid-ui-react";
import axios from "axios";
import postData from "../../helpers/postData";
import {SolidNameComponent} from "../solid/SolidNameComponent";
import toast, {Toaster} from "react-hot-toast";

const notify = (msj: string) => toast(msj);

const OrderSummary = () => {
    return (
        <Box>
            <Paper>
                <Box>
                    <Typography variant="h1">Name: {localStorage.getItem("fn")}</Typography>
                </Box>
            </Paper>
        </Box>
    )
}

const ContactData = () => {
    return (
        <Box>
            <Paper>
                <Box>
                    <Typography variant="h1">Name: {localStorage.getItem("fn")}</Typography>
                </Box>
            </Paper>
        </Box>
    )
}

export const DisplayOrderSummaryComponent = () => {

    const {cartItems, dispatch } = useContext(CartContext);
    const [showToast, setShowToast ] = useState(false);
    const [shippingPrice, setShippingPrice] = useState(0.0)

    const {session} = useSession()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setShowToast(true);

        const orderDetails = cartItems.map(({_id, image, ...item}) => item);

        if(orderDetails.length > 0){

            const order: OrderAdd = {
                address: localStorage.getItem("address") + "",
                name: localStorage.getItem("fn") + "",
                webId: session.info.webId + "",
                products: cartItems,
                shippingPrice: parseFloat(shippingPrice.toFixed(2)),
                totalPrice: parseFloat(localStorage.getItem("totalPrice") + "") + parseFloat(shippingPrice.toFixed(2)),
            }
            console.log("order: " + order.shippingPrice)
            const fetchApi = await postData(order);

            if(!fetchApi.ok){
                notify('An error has occurred, try again');
            }else{
                notify('Order placed correctly!');

                dispatch({
                    payload: [],
                    type: 'CLEAR'
                });

            }
        }else {
            notify('We cannot place an empty order');
        }

        setTimeout(() => setShowToast(false),5000);
    }


    return (
        <Grid container
              justifyContent="center"
              alignItems="center"
              direction="row"
              columnSpacing={12}
        >
            <ContactData/>
            <OrderSummary/>
        </Grid>
    )
}
