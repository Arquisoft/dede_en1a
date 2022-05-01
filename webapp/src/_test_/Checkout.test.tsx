import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Checkout from '../pages/Checkout';

test('Returns checkout form', () => {
  render(<Checkout/>);
  const checkout = screen.getByTestId('checkout');
<<<<<<< Updated upstream
  expect(checkout).toBeInTheDocument();
});

//more tests?
=======
  expect(checkout).toContain("Last step");
  expect(checkout).toContain("To proceed, please fill this form")
});
>>>>>>> Stashed changes
