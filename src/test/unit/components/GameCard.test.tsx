import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameCard } from '../../../components/GameCard';

describe('Rendering Game GameCard', () => {

  let setup = () => {
    render(
        <GameCard
            gameName='Dragon Age: Inquisition'
            gameSummary='Surprisingly few dragons.'
            gameImage={["//images.igdb.com/igdb/image/upload/t_thumb/jrumdkrrox09wbtblrka.jpg"]}
            gamePlatforms={["PS3"]}
            gameGenres={["RPG"]}
            gameFranchises={["Dragon Age"]}
            gameCompanies={["BioWare"]}
            gameReleaseDate={["Nov 03, 2009"]}
        />);
  }

  beforeEach(async () => {
    setup()
  })
  

  it('renders GameCard', () => {
    const text = screen.getByText(/Add to Library/i);
    expect(text).toBeInTheDocument();
  })

  it('renders game name', () => {
    const name = screen.getByText(/Dragon Age: Inquisition/);
    expect(name).toBeInTheDocument();
  })

  it('renders game summary', () => {
    const summary = screen.getByText(/Surprisingly few dragons./);
    expect(summary).toBeInTheDocument();
  })
});
