import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import LogoutButton from '../components/logout/LogoutButtonComponent';

const toggleLoggedIn = () => null;

test("Logout button works correctly", () => {
    const testButton = render(<LogoutButton setIsLoggedIn={toggleLoggedIn}/>);
    expect(testButton).toBeTruthy();
})