import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import Cart from '../components/cart/Cart';
import { CartItem } from "../shared/shareddtypes";
import { CartContext } from '../context/CartContext';

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

const cartItems2: CartItem[] = [];

const dispatch = jest.fn(() => true)

test("Cart contains items", () => {
  const fakeCart = render(
    <CartContext.Provider value={{cartItems, dispatch}}>
      <Cart setIsInCheckout={() => true}/>
    </CartContext.Provider>);
  expect(fakeCart).toBeTruthy(); //check that fake items are in the cart
})

test("Cart returns empty when there are no items", () => {
  const fakeCart2 = render(
    <CartContext.Provider value={{cartItems2, dispatch}}>
      <Cart setIsInCheckout={() => true}/>
    </CartContext.Provider>);
  expect(fakeCart2).toBeTruthy();
  expect(fakeCart2).toHaveTextContent("Cart is empty");
})