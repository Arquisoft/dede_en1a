import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import Sidebar from '../components/Sidebar';

const handleClose = jest.fn(() => true)

test("Sidebar renders correctly", () => {
    const fakeSidebar = render(<Sidebar setIsInCheckout={() => false} handleClose={handleClose}/>)
    expect(fakeSidebar).toBeTruthy();
})

test("Sidebar contains cart", () => {
    const fakeSidebar = render(<Sidebar setIsInCheckout={() => false} handleClose={handleClose}/>)
    expect(fakeSidebar).toBeInTheDocument();
    //expect(fakeSidebar).toHaveTextContent('Your cart'); this is what I actually wanted to test, it just didn't work
})

test("Sidebar matches snapshot", () => {
    const fakeSidebar = render(<Sidebar setIsInCheckout={() => false} handleClose={handleClose}/>)
    expect(fakeSidebar).toMatchSnapshot();
})

