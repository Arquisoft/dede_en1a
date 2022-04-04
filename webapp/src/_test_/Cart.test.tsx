import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import Cart from '../components/cart/Cart';

test("Cart matches snapshot", () => {
  const fakeCart = render(<Cart />);
  expect(fakeCart).toMatchSnapshot();
})