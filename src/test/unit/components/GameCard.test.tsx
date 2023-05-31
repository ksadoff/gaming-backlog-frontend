import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameCard } from '../../../components/GameCard';

describe('Rendering Game GameCard', () => {
  

  it('renders GameCard', () => {
    render(
      <GameCard 
          gameTitle='Dragon Age'
          gameDescription='Surprisingly few dragons.'
          gameImage={["//images.igdb.com/igdb/image/upload/t_thumb/jrumdkrrox09wbtblrka.jpg"]} 
          gamePlatforms={["PS3"]} 
          gameGenres={["RPG"]} 
          gameUniverses={["Dragon Age"]} 
          gameCompanies={["BioWare"]} 
          gameReleaseDate={["Nov 03, 2009"]}
          />);
    const text = screen.getByText(/Add to Library/i);
    expect(text).toBeInTheDocument();
  })

  it('renders game title', () => {
    render(
      <GameCard 
          gameTitle='Dragon Age: Inquisition'
          gameDescription='Surprisingly few dragons.'
          gameImage={["//images.igdb.com/igdb/image/upload/t_thumb/jrumdkrrox09wbtblrka.jpg"]} 
          gamePlatforms={["PS3"]} 
          gameGenres={["RPG"]} 
          gameUniverses={["Dragon Age"]} 
          gameCompanies={["BioWare"]} 
          gameReleaseDate={["Nov 03, 2009"]}
          />);
    const title = screen.getByText(/Dragon Age: Inquisition/);
    expect(title).toBeInTheDocument();
  })

  it('renders game description', () => {
    render(
      <GameCard 
          gameTitle='Dragon Age'
          gameDescription='Surprisingly few dragons.'
          gameImage={["//images.igdb.com/igdb/image/upload/t_thumb/jrumdkrrox09wbtblrka.jpg"]} 
          gamePlatforms={["PS3"]} 
          gameGenres={["RPG"]} 
          gameUniverses={["Dragon Age"]} 
          gameCompanies={["BioWare"]} 
          gameReleaseDate={["Nov 03, 2009"]}
          />);
    const description = screen.getByText(/Surprisingly few dragons./);
    expect(description).toBeInTheDocument();
  })
});
