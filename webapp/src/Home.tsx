import React, { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";

import { CartItem, Product } from "./shared/shareddtypes";

type HomeProps = {
    products: Product[];
    cartProducts: CartItem[];
    onAdd: (product: Product) => void;
};

function Home(props: HomeProps): JSX.Element {

    return (
        <React.Fragment>
            <Typography
                component="h1"
                variant="h4"
                align="center"
                sx={{ mb: 4, mt: 4 }}
            >
                Shop
            </Typography>
        </React.Fragment>
    );
}

export default Home;