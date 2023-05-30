import React from 'react';
import { render, screen } from '@testing-library/react';
import GamePage from '../../../pages/GamePage';

describe('Rendering GamePage', () => {
  beforeEach(() => {
    render(<GamePage id="123" />);
  });

  it('renders game title', () => {
    const title = screen.getByText(/Knights of the Old Republic/i);
    expect(title).toBeInTheDocument();
  })
});
