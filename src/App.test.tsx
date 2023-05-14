import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// TODO: We'll add proper routing tests in GB-36
test('renders loading text', () => {
  render(<App />);
//   const linkElement = screen.getByText(/"Loading..."/i);
//   expect(linkElement).toBeInTheDocument();
});
