//import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('webpage renders', () => {
  render(<App />);

  const linkElement = screen.getByRole('img', { name: /dededeals/i })
  expect(linkElement).toBeInTheDocument();
});
