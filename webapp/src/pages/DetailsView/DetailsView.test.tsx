import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import DetailsView from './DetailsView';

//jest.spyOn(DetailsView, 'handleAddToCart');

test('Returns product details', () => {
    const div = document.createElement("div");
    ReactDOM.render(<DetailsView />, div);
  });