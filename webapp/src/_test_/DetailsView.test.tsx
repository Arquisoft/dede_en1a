import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import DetailsView from '../pages/DetailsView/DetailsView';

const testProduct = {
  _id: "622fc1418aedec1b7f536775",
  name: "Screwdriver",
  price: 2,
  description: "Multi-purpose screwdriver.",
  image: "b1cb26b99296eb1a8c3a912987c4a8fb5f99efe66e894d484449fe5fb55a9efb",
  weight: 1,
}

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router"),
  useParams: () => {
    _id: testProduct._id
  },
}));

const createWrapper = () => {
  return render(<DetailsView/>);
};

<<<<<<< Updated upstream
describe("Component Page", () => {
  describe("Rendering", () => {
    it("should render product details", () => {
      jest.spyOn(Router, 'useParams').mockReturnValue({ _id: '622fc17f8aedec1b7f53677a' })
      const wrapper = createWrapper();
      expect(wrapper).toBeTruthy; //this does nothing,  need to make more specific
    });
=======
describe("Product Details Page", () => {
  it("should render product name", () => {
    const productDetails = render(<DetailsView/>);
    expect(productDetails).toContain(testProduct.name); //need to make more specific
  });

  it("should render product price", () => {
    const productDetails = render(<DetailsView/>);
    expect(productDetails).toContain(testProduct.price); //need to make more specific
  });

  it("should render product image", () => {
    const productDetails = render(<DetailsView/>);
    expect(productDetails).toContain(testProduct.image); //need to make more specific
>>>>>>> Stashed changes
  });
});
 