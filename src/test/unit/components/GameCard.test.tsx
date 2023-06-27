import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameCard } from '../../../components/GameCard';

describe('Rendering Game GameCard', () => {
  

  it('renders GameCard', () => {
    render(
      <GameCard 
          gameName='Dragon Age'
          gameSummary='Surprisingly few dragons.'
          gameImage={["//images.igdb.com/igdb/image/upload/t_thumb/jrumdkrrox09wbtblrka.jpg"]} 
          gamePlatforms={["PS3"]} 
          gameGenres={["RPG"]} 
          gameFranchises={["Dragon Age"]}
          gameCompanies={["BioWare"]} 
          gameReleaseDate={["Nov 03, 2009"]}
          />);
    const text = screen.getByText(/Add to Library/i);
    expect(text).toBeInTheDocument();
  })

  it('renders game name', () => {
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
    const title = screen.getByText(/Dragon Age: Inquisition/);
    expect(title).toBeInTheDocument();
  })

  it('renders game summary', () => {
    render(
      <GameCard 
          gameName='Dragon Age'
          gameSummary='Surprisingly few dragons.'
          gameImage={["//images.igdb.com/igdb/image/upload/t_thumb/jrumdkrrox09wbtblrka.jpg"]} 
          gamePlatforms={["PS3"]} 
          gameGenres={["RPG"]} 
          gameFranchises={["Dragon Age"]}
          gameCompanies={["BioWare"]} 
          gameReleaseDate={["Nov 03, 2009"]}
          />);
    const summary = screen.getByText(/Surprisingly few dragons./);
    expect(summary).toBeInTheDocument();
  })
});
