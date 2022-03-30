import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import {Order} from "../../shared/shareddtypes";

type OrdersProps = {
    orders: Order[]
}

const DisplayOrders = (props: OrdersProps) => {
    return (
        <>
            {props.orders.map((order) => {
                return (
                    <TableRow>
                        <TableCell align="center" colSpan={1}>
                            {order.items.map((prod) => {return <img src={prod.image} width= "100" height= "100"/>})}
                        </TableCell>
                        <TableCell align="center" colSpan={2}>
                            {/*{order._id}*/}
                        </TableCell>
                        <TableCell align="center" colSpan={3}>
                            {order.items.map((prod) => {return prod.name + "\n "})}
                        </TableCell>
                        <TableCell align="center" colSpan={4}>
                            {/*{order.rawTotal + "€"}*/}
                        </TableCell>
                        <TableCell align="center" colSpan={5}>
                            {/*{order.shippingCosts + "€"}*/}
                        </TableCell>
                        <TableCell align="center" colSpan={6}>
                            {/*{order.total + "€"}*/}
                        </TableCell>
                    </TableRow>
                );
            })}
        </>
    );
}
export default DisplayOrders;