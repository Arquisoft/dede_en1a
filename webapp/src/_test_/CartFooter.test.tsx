import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import CartFooter from '../components/footer/CartFooter';

test("Footer matches snapshot", () => {
    const fakeForm = render(<CartFooter />);
    expect(fakeForm).toMatchSnapshot();
})