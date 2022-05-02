import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import OrderSummary from '../components/order/Order';
import { CartContext } from '../context/CartContext';
import { CartItem } from "../shared/shareddtypes";

type Props = {
    address: string[],
    shipping: {
        price: number,
        distance: number
    }
}

const cartItems: CartItem[] = [
    {
        _id: "123",
        name: "product1",
        image: "123",
        price: 10,
        amount: 10,
    },
    {
        _id: "456",
        name: "product2",
        image: "456",
        price: 20,
        amount: 20,
    },
    {
        _id: "789",
        name: "product3",
        image: "789",
        price: 30,
        amount: 30,
    }
  ];

const dispatch = jest.fn(() => true)

test("Order form renders correctly", () => {
    const testOrder = render(<CartContext.Provider value={{cartItems, dispatch}}><OrderSummary address={["calle", "falsa"]} shipping={{price: 10, distance: 400}}/></CartContext.Provider>);
    expect(testOrder).toBeTruthy();
})

test("Order form contains proper items", () => {
    const testOrder = render(<CartContext.Provider value={{cartItems, dispatch}}><OrderSummary address={["calle", "falsa"]} shipping={{price: 10, distance: 400}}/></CartContext.Provider>);
    
    //checking names
    expect(testOrder).toHaveTextContent(cartItems[0].name);
    expect(testOrder).toHaveTextContent(cartItems[1].name);
    expect(testOrder).toHaveTextContent(cartItems[2].name);

    //checking prices
    expect(testOrder).toHaveValue(cartItems[0].price);
    expect(testOrder).toHaveValue(cartItems[1].price);
    expect(testOrder).toHaveValue(cartItems[2].price);

})