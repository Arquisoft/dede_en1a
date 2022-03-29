import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Checkout from './Checkout';

test('Returns checkout form', () => {
  const div = document.createElement("div");
  ReactDOM.render(<Checkout />, div);
});