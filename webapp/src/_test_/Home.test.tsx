import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

test('Returns a container of products', () => {
    render(<Home/>);
    const productContainer = screen.getByTestId('productContainer');
    expect(productContainer).toBeInTheDocument();
});