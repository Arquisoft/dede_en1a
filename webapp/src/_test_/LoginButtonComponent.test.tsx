import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import LoginButton from '../components/login/LoginButtonComponent';

const toggleLoggedIn = () => null;

test("Login button works correctly", () => {
    const testButton = render(<LoginButton />);
    expect(testButton).toBeTruthy();
})

//how to check if user is actually logged out?

//is there a way to check local storage within test?