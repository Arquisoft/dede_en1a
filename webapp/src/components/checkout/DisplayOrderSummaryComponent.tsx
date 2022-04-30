import {Box, Button, Grid, List, Paper, Typography} from "@mui/material";
import React, {FormEvent, useContext, useEffect, useState} from "react";
import {CartContext} from "../../context/CartContext";
import {Address, OrderAdd} from "../../shared/shareddtypes";
import {useSession} from "@inrupt/solid-ui-react";
import axios from "axios";
import postData from "../../helpers/postData";
import {SolidNameComponent} from "../solid/SolidNameComponent";
import toast, {Toaster} from "react-hot-toast";
import {useHistory} from "react-router-dom";
import Item from "../cart/item/Item";
import {calculateTotal, calculateTotalPlusShiping} from "../../helpers/calculate";
import {useShipping} from "../../hooks/useShipping";
import HorizontalLinearStepper from "./HorizontalLinearStepper";

const notify = (msj: string) => toast(msj);

type DisplayProductsProps = {
    setProductCost: (cost: number) => void
}

type OrderSummaryProps = {
    setShippingPrice: (shippingPrice: number) => void
}

const DisplayProducts = (props: DisplayProductsProps) => {
    const {cartItems} = useContext(CartContext);
    const {setProductCost} = props

    useEffect(() => {
        setProductCost(calculateTotal(cartItems))
    })

    return (
        <Box>
            <Box>
                <Typography variant={"h3"}>Your products:</Typography>
            </Box>
            <List style={{maxHeight: 300, overflow: 'auto'}}>
                {
                    cartItems.map(item => (
                        <Item
                            inCheckout={true}
                            key={item._id}
                            item={item}/>
                    ))
                }
            </List>
            <Typography variant="h5">
                {"Total cost of products is: " + calculateTotal(cartItems).toFixed(2) + "€"}
            </Typography>
        </Box>
    )
}

const OrderSummary = ({setShippingPrice}: OrderSummaryProps) => {
    const [productCost, setProductCost] = useState(0.0)
    const shipping = useShipping(localStorage.getItem("address") + "")

    useEffect(() => {
        setShippingPrice(shipping.price)
    })

    return (
        <Box>
            <Paper>
                <Box>
                    <DisplayProducts setProductCost={setProductCost}/>
                </Box>
                <Typography variant={"h5"}>
                    {"Shipping cost: " + shipping.price.toFixed(2) + "€"}
                </Typography>
                <Typography variant={"h5"}>
                    {"Total order cost: " + (productCost + shipping.price).toFixed(2) + "€"}
                </Typography>
            </Paper>
        </Box>
    )
}

const ContactData = () => {
    return (
        <Box>
            <Paper>
                <Box>
                    <Typography variant="h3">Name: {localStorage.getItem("fn")}</Typography>
                    <Typography variant="h3">Address: {localStorage.getItem("address")}</Typography>
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

    const handleSubmit = async () => {

        setShowToast(true);

        const orderDetails = cartItems.map(({_id, image, ...item}) => item);

        if(orderDetails.length > 0){

            const order: OrderAdd = {
                address: localStorage.getItem("address") + "",
                name: localStorage.getItem("fn") + "",
                webId: session.info.webId + "",
                products: cartItems,
                shippingPrice: parseFloat(shippingPrice.toFixed(2)),
                totalPrice: parseFloat(calculateTotalPlusShiping(cartItems, shippingPrice).toFixed(2))
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
        <Box>
        <Grid container
              justifyContent="center"
              alignItems="center"
              direction="column"
              columnSpacing={12}
        >
            <Box>
                <ContactData/>
                <OrderSummary setShippingPrice={setShippingPrice}/>
            </Box>
        </Grid>
            <Box sx={{margin: '60px'}}>
                <HorizontalLinearStepper handleSubmit={handleSubmit} step={2}/>
            </Box>
        </Box>
    )
}
