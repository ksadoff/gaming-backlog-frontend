import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import LibrariesPage from '../../../pages/LibrariesPage';
import * as libraryApi from "../../../api/libraryApi";

const librariesStub = jest.spyOn(libraryApi, 'getAllLibrariesWithGames');
describe('Rendering LibrariesPage', () => {
  beforeEach(async () => {
    librariesStub.mockResolvedValue([{id: "123", 
    name: "Want to Play", 
    games: [{
        id: "123", 
        name: "Disco Elysium", 
        platforms: ["PC"], 
        genres: ["RPG"], 
        franchises: [],
        companies: ["ZA/UM"],
        releaseDate: ["2019-10-15"],
        summary: "Kim Kitsuragi is the character ever.",
        images: ["de.png"]}],
    createDate: new Date()}])
    act(() => {
        render(<LibrariesPage />)
    });
  });

  it('renders page title', () => {
    const title = screen.getByText(/Libraries/i);
    expect(title).toBeInTheDocument();
  })

it('renders data', async () => {
    await waitFor(() => {
    const title = screen.getByText(/Want to Play/i)
    expect(title).toBeInTheDocument();
    });
    const game = screen.getByText(/Disco Elysium/i);
    expect(game).toBeInTheDocument();
})
});
