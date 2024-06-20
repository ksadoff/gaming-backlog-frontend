import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import LibrariesPage from '../../../pages/LibrariesPage';
import * as libraryApi from "../../../api/libraryApi";
import LibraryRequest from '../../../interfaces/LibraryRequest';

const getLibrariesStub = jest.spyOn(libraryApi, 'getAllLibrariesWithGames');
const createLibraryStub = jest.spyOn(libraryApi, 'createLibrary');
const deleteLibraryStub = jest.spyOn(libraryApi, 'deleteLibrary');
jest.spyOn(window, 'alert').mockImplementation(() => {});

const setup = async () => {
  getLibrariesStub.mockResolvedValue([{id: "123",
    name: "Want to Play",
    games: [{
        id: "1",
        name: "Disco Elysium",
        platforms: ["PC"],
        genres: ["RPG"],
        franchises: [],
        companies: ["ZA/UM"],
        releaseDate: ["2019-10-15"],
        summary: "Kim Kitsuragi is the character ever.",
        images: ["de.png"]}],
    createDate: new Date()},
    {id: "456",
    name: "Finished",
    games: [{
        id: "2",
        name: "Kirby and the Forgotten Land",
        platforms: ["Nintendo Switch"],
        genres: ["Platform"],
        franchises: ["Kirby"],
        companies: ["Nintendo"],
        releaseDate: ["2022-03-25"],
        summary: "Just forget about the eldritch horrors and look at the pink blob!",
        images: ["kirby.png"]}],
    createDate: new Date()}])

    createLibraryStub.mockResolvedValue({
      id: "789",
      name: "Finished",
      games: [{
        id: "1",
        name: "Pokémon Violet",
        platforms: ["Nintendo Switch"],
        genres: ["RPG"],
        franchises: ["Pokémon"],
        companies: ["Game Freak"],
        releaseDate: ["2022-11-18"],
        summary: "I could really go for a sandwich.",
        images: ["pv.png"]}],
      createDate: new Date()
    })

    await act(async () => {
      render(<LibrariesPage />)
  });
};

describe('Rendering LibrariesPage', () => {
  beforeEach(async () => {
    await setup()
    await waitFor(() => {
      const title = screen.getByText(/Want to Play/i)
      expect(title).toBeInTheDocument();
      expect(screen.getByRole('link', { name: "Want to Play"})).toBeInTheDocument();
      expect(screen.getByRole('link', { name: "Finished"})).toBeInTheDocument();
      });
  });

  it('renders page title', () => {
    const title = screen.getByText(/Libraries/i);
    expect(title).toBeInTheDocument();
  });

  it('renders data', () => {
      const game1 = screen.getByText(/Disco Elysium/i);
      expect(game1).toBeInTheDocument();
      const game2 = screen.getByText(/Kirby and the Forgotten Land/i);
      expect(game2).toBeInTheDocument();
  });

  it('renders create new library button', () => {
    expect(screen.getByText("Create Library"));
  });

  it('renders sort button', () => {
    expect(screen.getByText("Sort Ascending"));
  });

  it('renders search input', () => {
    expect(screen.getByTestId("search"));
  });

  it('renders delete buttons', () => {
    expect(screen.getAllByTestId("delete")).toHaveLength(2);
  });
  
  it('renders profile button', () => {
    expect(screen.getByRole('button', { name: "Profile" }));
    expect(screen.getByTestId('profile')).toHaveAttribute('href', "/users/64fcee6c18bc4d16a9f2051e")
  });

  describe('when you click on the sort button', () => {
    beforeEach(() => {
      fireEvent.click(screen.getByText(/Sort Ascending/i
      ));
    });

    it('sorts the libraries in alphabetical order', () => {
      const wantToPlay = screen.getByText(/Want to Play/i);
      const finished = screen.getByText(/Finished/i);
      expect(wantToPlay.compareDocumentPosition(finished)).toBe(2);
    });

    it('the sort button changes text', () => {
      expect(screen.getByText(/Sort Descending/i)).toBeInTheDocument();
      expect(screen.queryByText(/Sort Ascending/i)).not.toBeInTheDocument();
    });

    describe('and when you click again on the sort button', () => {
      beforeEach(() => {
        fireEvent.click(screen.getByText("Sort Descending"));
      });

      it('sorts the libraries in reverse alphabetical order', () => {
        const wantToPlay = screen.getByText(/Want to Play/i);
        const finished = screen.getByText(/Finished/i);
        expect(finished.compareDocumentPosition(wantToPlay)).toBe(2);
      });
    });
  });

  describe('when you enter a search term', () => {
    beforeEach(() => {
      const input = screen.getByTestId("search");
      fireEvent.change(input, { target: { value: "want" } });
    });

    it('renders only the matching libraries', () => {
      expect(screen.getByText(/Want to Play/i)).toBeInTheDocument();
      expect(screen.queryByText(/Finished/i)).not.toBeInTheDocument();
    });

    describe('and when the search term is deleted', () => {
      beforeEach(() => {
        const input = screen.getByTestId("search");
        fireEvent.change(input, { target: { value: "" } });
      });

      it('renders all the libraries', () => {
        expect(screen.getByText(/Want to Play/i)).toBeInTheDocument();
        expect(screen.getByText(/Finished/i)).toBeInTheDocument();
      });
    });
  });

  describe('when you click on the create library button', () => {
    beforeEach(async () => {
      await act(async () => {
        fireEvent.click(screen.getByText("Create Library"));
      })
      await waitFor(() => {
        expect(screen.getByText("Enter your library name here")).toBeInTheDocument();
      });
    });

    it('the modal appears', () => {
      expect(screen.getByText("Enter your library name here"));
    });

    describe('and when we submit a new library', () => {
      beforeEach(async () => {
        const input = screen.getByTestId("libraryName");
        await act(async () => {
          fireEvent.change(input, { target: { value: "New Library" } });
          fireEvent.click(screen.getByText("submit"));
        })
      })

      it('calls the create library api', async () => {
        const libraryToCreate: LibraryRequest = {
          name: "New Library",
          games: [],
      };
        expect(createLibraryStub).toHaveBeenCalledWith(libraryToCreate);
      });
    });
  });

  describe('when you click on the delete button for a library', () => {
    beforeEach(async () => {
      await act(async () => {
        fireEvent.click(screen.getAllByTestId("delete")[0]);
      });
    });

    it('calls the deleteLibrary stub', () => {
      expect(deleteLibraryStub).toHaveBeenCalledWith("123");
    });

    it('calls the getLibraryStub to update the libraries', () => {
      expect(getLibrariesStub).toHaveBeenCalled();
    });
  });
});