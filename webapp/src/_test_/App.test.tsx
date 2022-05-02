//import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('webpage renders', () => {
  const screen = render(<App />);

  const linkElement = screen.getByRole('img', { name: /dededeals/i })
  expect(linkElement).toBeTruthy();
});
