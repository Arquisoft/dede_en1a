import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import { CartItem } from "../shared/shareddtypes";
import { calculateTotal, calculateTotalPlusShiping, getTotalItems } from '../helpers/calculate';

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

test("Calculate total works correctly", () => {
    expect(calculateTotal(cartItems)).toEqual(1400);
})

test("Calculate total plush shipping works correctly", () => {
    expect(calculateTotalPlusShiping(cartItems, 10)).toBeTruthy(); //fix this one
})

test("Calculating the total number of items works correctly", () => {
    expect(getTotalItems(cartItems)).toEqual(60);
})