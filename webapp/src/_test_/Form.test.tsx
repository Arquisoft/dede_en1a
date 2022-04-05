import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import Form from '../components/checkout/Form';

const setAddress = jest.fn(() => null)

test("Form matches snapshot", () => {
	//TODO: fix this
//   const fakeForm = render(<Form setNewAddress={setAddress} />);
//   expect(fakeForm).toMatchSnapshot();
})

//Test handle change

//Test handle submit