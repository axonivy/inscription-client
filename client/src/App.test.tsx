import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('App - render user dialog', () => {
  render(<App />);
  const linkElement = screen.getByText(/Inscribe User Dialog/i);
  expect(linkElement).toBeInTheDocument();
});
