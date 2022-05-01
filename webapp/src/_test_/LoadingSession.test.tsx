import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import LoadingSession from '../components/LoadingSessionComponent';

/*
jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useParams: jest.fn(),
}));
*/

jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router"),
    useHistory: () => ({
      push: jest.fn(),
    }),
    useParams: () => ({
        webID: 'mock webID',
        sessionId: 'sessionID',
      }),
    useRouteMatch: () => ({ url: '/webID/web-ID/session/session-Id' }), //need to fix this
}));

test("Loading session component renders", () => {
    const fakeComponent = render(<LoadingSession />);
    expect(fakeComponent).toBeInTheDocument();
    //this is throwing an error i dont understand, so commented out
})
