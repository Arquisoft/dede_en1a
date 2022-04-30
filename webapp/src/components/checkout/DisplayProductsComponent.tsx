import {List, Grid, Box, Paper, Typography, Button} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {CartContext} from "../../context/CartContext";
import Item from "../cart/item/Item";
import {useHistory} from "react-router-dom";
import HorizontalLinearStepper from "./HorizontalLinearStepper";
import {calculateTotal} from "../../helpers/calculate";

type DisplayProductsProps = {
    setIsEmpty: (isEmpty: boolean) => void
}

const DisplayProducts = (props: DisplayProductsProps) => {
    const {cartItems} = useContext(CartContext);
    const {setIsEmpty} = props
    const history = useHistory()

    useEffect(() => {
        if(!cartItems.length)
            setIsEmpty(true)
    }, [cartItems.length])

    const redirectHome = () => {
        history.push("/")
    }

    if (!cartItems.length) return (
        <Box>
            <Typography>
                Your cart is empty, please
            </Typography>
            <Button onClick={redirectHome}>
                click here to go back.
            </Button>
        </Box>
    )

    return (
        <Box>
            <List style={{maxHeight: 300, overflow: 'auto'}}>
                {
                    cartItems.map(item => (
                        <Item
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

export const DisplayProductsComponent = () => {
    const [isEmpty, setIsEmpty] = useState(false)

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            justifyContent="center"
            style={{ minHeight: '50vh'}}
        >
            <Box alignSelf={"left"} component="div" sx={{marginTop: '20px',marginLeft: '5%', marginRight: '5%', maxWidth: '25%', whiteSpace: 'normal' }}>
                <Typography variant="h6">
                    Your products
                </Typography>
            </Box>
            <Paper  sx={{marginTop: '30px', marginLeft: '100px', marginRight: '100px', marginDown: '100px'}}>
                <Box alignSelf="center">
                    <DisplayProducts setIsEmpty={setIsEmpty}/>
                </Box>
            </Paper>
            <Box hidden={isEmpty} sx={{margin: '60px'}}>
                <HorizontalLinearStepper step={0}/>
            </Box>
        </Grid>
    )
}