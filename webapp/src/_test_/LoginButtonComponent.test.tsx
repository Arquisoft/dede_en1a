import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import {LoginButtonProvider} from '../components/userAuthentication/loginLogogut/LoginButtonComponent';

const toggleLoggedIn = () => null;

test("Login button works correctly", () => {
    const testButton = render(<LoginButtonProvider />);
    expect(testButton).toBeTruthy();
})

//how to check if user is actually logged out?

//is there a way to check local storage within test?