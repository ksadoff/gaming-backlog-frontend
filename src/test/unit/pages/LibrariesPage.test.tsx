import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import LibrariesPage from '../../../pages/LibrariesPage';
import * as libraryApi from "../../../api/libraryApi";
import LibraryRequest from '../../../interfaces/LibraryRequest';

const getLibrariesStub = jest.spyOn(libraryApi, 'getAllLibrariesWithGames');
const createLibraryStub = jest.spyOn(libraryApi, 'createLibrary');

let setup = () => {
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

    act(() => {
      render(<LibrariesPage />)
  });
};

describe('Rendering LibrariesPage', () => {
  beforeEach(async () => {
    setup()
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

  it('renders data', async () => {
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
    beforeEach(() => {
      fireEvent.click(screen.getByText("Create Library"));
    });

    it('the modal appears', () => {
      expect(screen.getByText("Enter your library name here"));
    });

    describe('and when we submit a new library', () => {
      beforeEach(() => {
        const input = screen.getByTestId("libraryName");
        fireEvent.change(input, { target: { value: "New Library" } });
        fireEvent.click(screen.getByText("submit"));
      });

      it('calls the create library api', () => {
        const libraryToCreate: LibraryRequest = {
          name: "New Library",
          games: [],
      };
        expect(createLibraryStub).toHaveBeenCalledWith(libraryToCreate);
      });
    });
  });
});
