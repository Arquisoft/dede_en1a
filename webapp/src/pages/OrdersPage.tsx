import React, {FC, useState, useEffect} from "react";
import {Order} from "../shared/shareddtypes";
import {getOrdersForUser} from "../api/api";
import {Button} from "react-bootstrap";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {Paper, Table, TableContainer, TableHead} from "@mui/material";

const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    let webId = localStorage.getItem("webID");

    const reloadItems = async () => {
        setOrders(await getOrdersForUser(webId));
    }

    useEffect(() => {
        reloadItems();
    }, []);

    if (orders.length === 0) {
        return (<div>Empty for now</div>);
    }
}

export default OrdersPage;