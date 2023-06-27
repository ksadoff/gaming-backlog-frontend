import React from 'react';
import { render, screen } from '@testing-library/react';
import LibraryPage from '../../../pages/LibraryPage';
import * as libraryApi from "../../../api/libraryApi";
import GamePage from "../../../pages/GamePage";
import Library from "../../../interfaces/Library";

describe('Rendering LibraryPage', () => {

  let setup = () => {
    const mockGetLibrary = jest.spyOn(libraryApi, 'getLibrary')
    mockGetLibrary.mockResolvedValue({
      id: "",
      name: "My Library",
      games: [],
      createDate: new Date(1990, 4, 7)
    })
    render(<LibraryPage libraryId="test" />);
  }

  beforeEach(() => {
    setup()
  })

  it('renders library name', async () => {
    const name = await screen.findByText(/My Library/i);
    expect(name).toBeInTheDocument();
  })
});
