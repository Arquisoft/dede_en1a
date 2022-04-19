import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import Order from '../components/order/Order';

const order = {

}

type Props = {
    address: string[],
    shipping: {
        price: number,
        distance: number
    }
}

test("Order form renders correctly", () => {
    const testOrder = render(<Order address={["calle", "falsa"]} shipping={{price: 10, distance: 400}}/>);
    expect(testOrder).toBeTruthy();
})

