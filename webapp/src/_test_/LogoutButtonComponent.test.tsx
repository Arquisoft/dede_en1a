import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import {LogoutButtonSolid} from '../components/userAuthentication/loginLogogut/LogoutButtonComponent';

const toggleLoggedIn = () => null;

jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router"),
    useHistory: () => ({
      push: jest.fn(),
    }),
}));

test("Logout button renders", () => {
    const testButton = render(<LogoutButtonSolid />);
    expect(testButton).toBeTruthy();
})

test("Logout button says logout", () => {
    const testButton = render(<LogoutButtonSolid />);
    expect(testButton).toContain('Logout');
})

// Logout button should function -> after clicking, user is logged out.