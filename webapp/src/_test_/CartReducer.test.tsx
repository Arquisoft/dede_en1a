import React from 'react';
import { useReducer } from "react";
actDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import cartReducer from '../reducer/cartReducer';
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

const [cartItems2, dispatch] = useReducer(cartReducer, cartItems);
  
test("Add function works", () => {
    const fakeItem: CartItem = cartItems2[0];
    const beforeAmount = fakeItem.amount;

    const returnedItem = dispatch(fakeItem, 'ADD');

    expect(returnedItem).amount === beforeAmount + 1;
})

test("Remove function works", () => {
    const fakeItem: CartItem = cartItems2[0];
    const beforeAmount = fakeItem.amount;

    const returnedItem = dispatch(fakeItem, 'REMOVE');

    expect(returnedItem).amount === beforeAmount - 1;
})

test("Clear function works", () => {
    const fakeItem: CartItem = cartItems2[0];
    const beforeAmount = fakeItem.amount;

    const returnedItem = dispatch(fakeItem, 'CLEAR');

    expect(returnedItem).toBeNull();
})
