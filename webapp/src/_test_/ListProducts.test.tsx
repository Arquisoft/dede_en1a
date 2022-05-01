import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import ListProducts from '../components/listProducts/ListProducts';
import { Product } from '../shared/shareddtypes'

const handleAddToCart = jest.fn(() => null)

const testItems: Product[] = [
  {
    _id: "622fc1418aedec1b7f536775",
    name: "Screwdriver1",
    price: 10,
    description: "Multi-purpose screwdriver.",
    image: "b1cb26b99296eb1a8c3a912987c4a8fb5f99efe66e894d484449fe5fb55a9efb",
    weight: 1
  },
  {
    _id: "622fc1418aedec1b7f536775",
    name: "Screwdriver2",
    price: 100,
    description: "Multi-purpose screwdriver.",
    image: "b1cb26b99296eb1a8c3a912987c4a8fb5f99efe66e894d484449fe5fb55a9efb",
    weight: 1
  },
  {
    _id: "622fc1418aedec1b7f536775",
    name: "Screwdriver3",
    price: 1000,
    description: "Multi-purpose screwdriver.",
    image: "b1cb26b99296eb1a8c3a912987c4a8fb5f99efe66e894d484449fe5fb55a9efb",
    weight: 1
  }
]

jest.mock('../hooks/useFetch', () => {
  return jest.fn(() => ({
     products: testItems
  }))
})

test("Product listing contains test items", () => {
  const fakeProducts = render(<ListProducts />);
  expect(fakeProducts).toContain('Screwdriver1');
  expect(fakeProducts).toContain('Screwdriver2');
  expect(fakeProducts).toContain('Screwdriver3');
})

/*
test("Product listing filters items", () => {
  const fakeProducts = render(<ListProducts />);
  expect(fakeProducts).toContain('Screwdriver1');
  expect(fakeProducts).toContain('Screwdriver2');
  expect(fakeProducts).toContain('Screwdriver3');
})
*/

test("Product listing matches snapshot", () => {
  const fakeProducts = render(<ListProducts />);
  expect(fakeProducts).toMatchSnapshot();
})

//test handle add to cart

//test that correct names and descriptions show up

//mock useFetch hook?