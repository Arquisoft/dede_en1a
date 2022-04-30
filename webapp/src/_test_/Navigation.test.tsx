import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import Navigation from '../components/Navigation';

const handleOpen = jest.fn(() => true)

test("Navigation renders correctly", () => {
    const fakeNavigation = render(<Router><Navigation isInCheckout={false} isLoggedIn={false} handleOpen={handleOpen}/></Router>)
    expect(fakeNavigation).toBeTruthy();
})