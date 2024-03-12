import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import LibraryPage from '../../../pages/LibraryPage';
import * as libraryApi from "../../../api/libraryApi";

const libraryStub = jest.spyOn(libraryApi, 'getLibraryWithGames');
const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('Rendering LibraryPage', () => {
  let setup = async () => {
    await act(async () => {
      libraryStub.mockResolvedValue({id: "123",
      name: "Want to Play",
      games: [{
        id: "123",
        name: "Disco Elysium"}]
      });
   
      render(<LibraryPage libraryId="123" />);
    })
  }

  beforeEach(async () => {
    await setup();
  })

  afterEach(() => {
    jest.resetAllMocks();
  })

  it('renders library title', async () => {
    await act(async () => {
      await waitFor(() => {
        const title = screen.getByText(/Want to Play/i);
        expect(title).toBeInTheDocument();
      });
    });
  })

  it('renders game title', async () => {
    await act(async () => {
      await waitFor(() => {
        const title = screen.getByText(/Disco Elysium/i);
        expect(title).toBeInTheDocument();
      });
    });
  })
});