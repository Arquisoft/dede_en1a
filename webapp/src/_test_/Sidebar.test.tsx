import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import Sidebar from '../components/Sidebar';

const handleClose = jest.fn(() => true)

test("Sidebar renders correctly", () => {
    const fakeSidebar = render(<Sidebar handleClose={handleClose}/>)
    expect(fakeSidebar).toBeTruthy();
})

test("Sidebar contains cart", () => {
    const fakeSidebar = render(<Sidebar handleClose={handleClose}/>)
    expect(fakeSidebar).toContain('Your cart');
})

test("Sidebar matches snapshot", () => {
    const fakeSidebar = render(<Sidebar setIsInCheckout={() => false} handleClose={handleClose}/>)
    expect(fakeSidebar).toMatchSnapshot();
})

