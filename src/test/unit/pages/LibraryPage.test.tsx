import React from 'react';
import { render, screen } from '@testing-library/react';
import LibraryPage from '../../../pages/LibraryPage';

describe('Rendering LibraryPage', () => {
  beforeEach(() => {
    render(<LibraryPage libraryId = "" />);
  });

  it('renders library title', () => {
    const title = screen.getByText(/My Library/i);
    expect(title).toBeInTheDocument();
  })
});
