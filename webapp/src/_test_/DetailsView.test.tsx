import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import DetailsView from '../pages/DetailsView/DetailsView';

//jest.spyOn(DetailsView, 'handleAddToCart');

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
}));

const createWrapper = () => {
  return render(<DetailsView/>);
};

describe("Component Page", () => {
  describe("Rendering", () => {
    it("should render product details", () => {
      jest.spyOn(Router, 'useParams').mockReturnValue({ _id: '622fc17f8aedec1b7f53677a' })
      const wrapper = createWrapper();
      expect(wrapper).toBeTruthy; //need to make more specific
    });
  });
});
 