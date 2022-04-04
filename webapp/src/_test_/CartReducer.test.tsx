import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import CartReducer from '../reducer/cartReducer';
import { CartItem } from "../shared/shareddtypes";

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
  
test("Add function works", () => {
    expect(CartReducer).toBeTruthy();
})

//need to come back to this to figure out how useReducer works.
