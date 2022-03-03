import React, { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";

import { getUsers } from "./api/api";
import { User } from "./shared/shareddtypes";
import { CartItem, Product } from "./shared/shareddtypes";

type HomeProps = {
    products: Product[];
    cartProducts: CartItem[];
    onAdd: (product: Product) => void;
};

function Home(props: HomeProps): JSX.Element {
    const [users, setUsers] = useState<User[]>([]);

    const refreshUserList = async () => {
        setUsers(await getUsers());
    };

    useEffect(() => {
        refreshUserList();
    }, []);

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