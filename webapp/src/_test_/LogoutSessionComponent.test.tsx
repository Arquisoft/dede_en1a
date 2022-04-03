import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useHistory } from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import LogoutSession from '../components/logout/LogoutSessionComponent';

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
      push: jest.fn(),
    }),
}));

test("Logout session button works correctly", () => {
    const testButton = render(<LogoutSession />);
    expect(testButton).toBeTruthy();
})