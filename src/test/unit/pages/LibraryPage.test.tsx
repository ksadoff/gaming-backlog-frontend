import React from 'react';
import { act, render, screen } from '@testing-library/react';
import LibraryPage from '../../../pages/LibraryPage';
import * as libraryApi from "../../../api/libraryApi";

const libraryStub = jest.spyOn(libraryApi, 'getLibraryWithGames');
describe('Rendering LibraryPage', () => {
  beforeEach(() => {
    libraryStub.mockResolvedValue({id: "123", 
    name: "Want to Play", 
    games: [{
        id: "123", 
        name: "Disco Elysium"}]
      })
  });

  afterEach(() => {
    jest.resetAllMocks();
  })

  describe('when loaded', () => {
    beforeEach(async () => {
      act(() => {
        render(<LibraryPage libraryId="123" />);
      });
    })

    it('renders library title', async () => {
      const title = await screen.findByText(/Want to Play/i);
      expect(title).toBeInTheDocument();
    })
  
    it('renders game title', async () => {
      const title = await screen.findByText(/Disco Elysium/i);
      expect(title).toBeInTheDocument();
    })
  })
});
