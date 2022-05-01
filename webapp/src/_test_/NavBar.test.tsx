import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import NavBar from '../components/NavBar';

const handleOpen = jest.fn(() => true)

test("NavBar contains logo", () => {
    const fakeNavBar = render(<Router><NavBar isLoggedIn={false} handleOpen={handleOpen}/></Router>)
    //expect(fakeNavBar).toContain(logo); go back and fix this
})

test("NavBar matches snapshot", () => {
    const fakeNavBar = render(<Router><NavBar isLoggedIn={false} handleOpen={handleOpen}/></Router>)
    expect(fakeNavBar).toMatchSnapshot();
})

// test distinct components in separate test scripts?
// test that buttons work correctly?
