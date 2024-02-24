import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import GamePage  from '../../../pages/GamePage';
import Game from '../../../interfaces/Game';
import * as gameApi from '../../../api/gameApi';

describe('Rendering GamePage', () => {
  let mockGame: Game = {
    id: "18327",
    name: "The Legend of Zelda: Tears of the Kingdom", 
    platforms: ["Nintendo Switch"],
    genres: ["Action-Adventure", "Adventure"],
    franchises: ["Legend of Zelda"],
    companies: ["Nintendo"],
    releaseDate: ["May 12 2023"],
    summary: "So much Zelda so much fun",
    images: ["img"]
}

let setup = async () => {
  const mockGetGame = jest.spyOn(gameApi, 'getGame')
  mockGetGame.mockResolvedValue(mockGame)

  await act(async () => {
    render(<GamePage gameId="test" />);
  })
}

beforeEach(async() => {
  await setup();
})

  it('renders game title', async () => {
    await waitFor(async () => {
      const title = await screen.findByText(/The Legend of Zelda: Tears of the Kingdom/);
      expect(title).toBeInTheDocument();
    })
  })

  it('renders platforms', async () => {
    await waitFor(async () => {
      const platform = await screen.findByText(/Nintendo Switch/);
      expect(platform).toBeInTheDocument();
    });
  })

  it('renders genres', async () => {
    await waitFor(async () => {
      const genre1 = await screen.findByText(/Action-Adventure/);
      expect(genre1).toBeInTheDocument();

      const genre2 = await screen.findAllByText(/Adventure/);
      expect(genre2[1]).toBeInTheDocument();
    })
  })

  it('renders franchises', async () => {
    await waitFor(async () => {
      const franchise = await screen.findAllByText(/Legend of Zelda/);
      expect(franchise[1]).toBeInTheDocument();
    });
  })

  it('renders comapnies', async () => {
    await waitFor(async () => {
      const company = await screen.findAllByText(/Nintendo/);
      expect(company[1]).toBeInTheDocument();
    })
  })

  it('renders release date', async () => {
    await waitFor(async () => {
      const date = await screen.findByText(/May 12 2023/i);
      expect(date).toBeInTheDocument();
    })
  })

  it('renders summary', async () => {
    await waitFor(async () => {
      const summary = await screen.findByText(/So much Zelda so much fun/i);
      expect(summary).toBeInTheDocument();
    })
  })

  it('renders image', async () => {
    await waitFor(async () => {
      const image = await screen.findByAltText("Game")
      expect(image).toBeInTheDocument();
    })
  })
});
