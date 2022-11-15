import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameCard } from '../../../components/GameCard';

// const img = "path-to-image"

describe('Rendering GameCard', () => {
  beforeEach(() => {
    render(
    <GameCard 
        gameTitle='Dragon Age' 
        gameDescription='Surprisingly few dragons.'
        gameImage=''
     />);
  });

  it('renders GameCard', () => {
    const text = screen.getByText(/Add to Library/i);
    expect(text).toBeInTheDocument();
  })
  // TODO: Once functionality in GameCard is working, uncomment these tests
//   it('renders game title', () => {
    // const title = screen.getByText(/Dragon Age/i);
    // expect(title).toBeInTheDocument();
//   })

//   it('renders game description', () => {
    // const description = screen.getByText(/Surprisingly few dragons./i);
    // expect(title).toBeInTheDocument();
//   })

//   it('renders game image', () => {
    // expect(img).toBeInTheDocument();
//   })
});
