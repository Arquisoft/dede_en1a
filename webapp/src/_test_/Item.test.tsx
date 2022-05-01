import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import Item from '../components/cart/item/Item';

const testProduct = {
    _id: "622fc1418aedec1b7f536775",
    name: "Screwdriver",
    price: 2,
    description: "Multi-purpose screwdriver.",
    image: "b1cb26b99296eb1a8c3a912987c4a8fb5f99efe66e894d484449fe5fb55a9efb",
    weight: 1,
    amount: 10,
  }

test("Items contains product name"), () => {
  const fakeItem = render(<Item item={testProduct} />);
  expect(fakeItem).toContain(testProduct.name)
}

test("Items contains product price"), () => {
  const fakeItem = render(<Item item={testProduct} />);
  expect(fakeItem).toContain(testProduct.price)
}

test("Items contains product price"), () => {
  const fakeItem = render(<Item item={testProduct} />);
  expect(fakeItem).toContain(testProduct.price)
}

test("Item matches snapshot", () => {
    const fakeItem = render(<Item item={testProduct} />);
    expect(fakeItem).toMatchSnapshot();
 })

 //more tests -> test that correct names and descriptions show up
