import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import NavBar from '../components/NavBar';

const handleOpen = jest.fn(() => true)

test("NavBar matches snapshot", () => {
    const fakeNavBar = render(<Router><NavBar handleOpen={handleOpen}/></Router>)
    expect(fakeNavBar).toMatchSnapshot();
})