import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import selectEvent from 'react-select-event'
import { GameCard } from '../../../components/GameCard';
import * as libraryApi from "../../../api/libraryApi";
import Library from "../../../interfaces/Library";
import Game from "../../../interfaces/Game"

describe('Rendering Game GameCard', () => {

  const allLibrariesStub = jest.spyOn(libraryApi, 'getAllLibraries')
  const addToLibraryStub = jest.spyOn(libraryApi, 'addToLibrary')

  const library1: Library = {
    id: "1",
    name: "Want to Play",
    games: [],
    createDate: new Date()
  }
  const library2: Library = {
    id: "2",
    name: "Completed Games",
    games: [],
    createDate: new Date()
  }
  const library3: Library = {
    id: "3",
    name: "Wishlist",
    games: [],
    createDate: new Date()
  }
  const library4: Library = {
    id: "4",
    name: "Games Under 5 Hours",
    games: [],
    createDate: new Date()
  }

  const mockGame: Game = {
    companies: [""],
    franchises: [""],
    genres: [""],
    images: [""],
    name: "",
    platforms: [""],
    releaseDate: [""],
    summary: "",
    id: ""
  }

  let getMockLibraries = () => [library1, library2, library3, library4]

  let setup = () => {
    allLibrariesStub.mockResolvedValue(getMockLibraries())
    addToLibraryStub.mockImplementation((gameId: string, libraryId: string): Promise<any> => {
      mockGame.id = gameId
      const libraryInd = +libraryId - 1
      getMockLibraries()[libraryInd].games.push(mockGame)
      return Promise.resolve()
    })
    render(
        <GameCard
            gameId = "testID"
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

  let tearDown = () => {
    library1.games = []
    library2.games = []
    library3.games = []
    library4.games = []
  }

  beforeEach(async () => {
    setup()
  })

  afterEach(() => {
    tearDown()
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

  it('renders select menu', async () => {
    const selectPlaceholder = screen.getByText(/Select a Library/);
    expect(selectPlaceholder).toBeInTheDocument()
  })

  it('renders add to library button', async () => {
    const addToLibraryPlaceholder = screen.getByText(/Add to Library/);
    expect(addToLibraryPlaceholder).toBeInTheDocument()
  })

  it('should add game to library after clicking library', async () => {
    await selectEvent.select(screen.getByText(/Select a Library/), "Want to Play")
    fireEvent(
        screen.getByText('Add to Library'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
    )
    expect(library1.games.length).toEqual(1)
    expect(library1.games[0].id).toEqual("testID")
  })

  it('should not add to library with no games selected', async () => {
    fireEvent(
        screen.getByText('Add to Library'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
    )
    expect(addToLibraryStub).not.toHaveBeenCalled()
    expect(library1.games.length).toEqual(0)
    expect(library2.games.length).toEqual(0)
    expect(library3.games.length).toEqual(0)
    expect(library4.games.length).toEqual(0)
  })

  it("should select one library, then another, and add to the second library", async () => {
    await selectEvent.select(screen.getByText(/Select a Library/), "Wishlist")
    await selectEvent.select(screen.getByText(/Wishlist/), "Games Under 5 Hours")
    fireEvent(
        screen.getByText('Add to Library'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
    )
    expect(library3.games.length).toEqual(0)
    expect(library4.games.length).toEqual(1)
    expect(library4.games[0].id).toEqual("testID")
  })
});
