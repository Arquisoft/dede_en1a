import React from 'react';
import {useParams} from "react-router";
import {useHistory} from "react-router-dom";
import {useEffect} from "react";
import {CircularProgress} from "@mui/material";

export {}

type URLParams = {
    name: string,
    address: string
}

const CheckoutData = () => {
    const {name, address} = useParams<URLParams>()
    const history = useHistory()

    useEffect(
        () => {
            localStorage.setItem("name", name)
            localStorage.setItem("address", address)
            history.push("/checkout")
        },
        [history, name, address]
    )

    return (
        <CircularProgress/>
    )
}

export default CheckoutData