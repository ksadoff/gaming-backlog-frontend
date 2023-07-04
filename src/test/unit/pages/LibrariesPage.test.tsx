import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import LibrariesPage from '../../../pages/LibrariesPage';
import * as libraryApi from "../../../api/libraryApi";
import LibraryRequest from '../../../interfaces/LibraryRequest';

const getLibrariesStub = jest.spyOn(libraryApi, 'getAllLibrariesWithGames');
const createLibraryStub = jest.spyOn(libraryApi, 'createLibrary');

describe('Rendering LibrariesPage', () => {
let setup = () => {
  getLibrariesStub.mockResolvedValue([{id: "123",
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
};

describe('Rendering LibrariesPage', () => {
  beforeEach(async () => {
    setup()
  });

  it('renders page title', () => {
    const title = screen.getByText(/Libraries/i);
    expect(title).toBeInTheDocument();
  });

  it('renders data', async () => {
      await waitFor(() => {
      const title = screen.getByText(/Want to Play/i)
      expect(title).toBeInTheDocument();
      expect(screen.getByRole('link', { name: "Want to Play"})).toBeInTheDocument();
      });
      const game = screen.getByText(/Disco Elysium/i);
      expect(game).toBeInTheDocument();
  });

  it('renders create new library button', () => {
    expect(screen.getByText("Create Library"));
  });

  describe('when you click on the button', () => {
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
