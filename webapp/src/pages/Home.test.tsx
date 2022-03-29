import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('Returns a container of products', () => {
    const div = document.createElement("div");
    ReactDOM.render(<Home />, div);
});