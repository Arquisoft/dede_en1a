import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import {LogoutButtonSolid} from '../components/userAuthentication/loginLogogut/LogoutButtonComponent';

const toggleLoggedIn = () => null;

test("Logout button renders", () => {
    const testButton = render(<LogoutButtonSolid />);
    expect(testButton).toBeTruthy();
})

// Logout button should function -> after clicking, user is logged out.