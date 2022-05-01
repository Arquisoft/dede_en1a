import React from 'react';
import {Grid, Link, Paper, Typography} from "@mui/material";
import {useHistory} from "react-router-dom"
export const CheckoutSuccessComponent = () => {
    const history = useHistory()

    const toOrders = () => {
        history.push("/orders/list")
    }

    const toHome = () => {
        history.push("/")
    }

    return(
        <Grid
            container
            spacing={0}
            direction="column"
            justifyContent="center"
            style={{ minHeight: '50vh'}}
        >
            <Paper>
                <Typography variant={"h3"}>
                    Successfully placed order
                    <Link onClick={toHome}> continue shopping </Link>
                     or
                    <Link onClick={toOrders}> see your orders.</Link>
                </Typography>

            </Paper>
        </Grid>
    )
}