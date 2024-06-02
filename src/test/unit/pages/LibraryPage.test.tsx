import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import LibraryPage from '../../../pages/LibraryPage';
import * as libraryApi from "../../../api/libraryApi";

const getLibraryWithGamesStub = jest.spyOn(libraryApi, 'getLibraryWithGames');
const renameLibraryStub = jest.spyOn(libraryApi, 'renameLibrary');
jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('Rendering LibraryPage', () => {
  const setup = async () => {
    await act(async () => {
      const testLibraryPreview = 
      {
        id: "123",
        name: "Want to Play",
        games: [{
          id: "123",
          name: "Disco Elysium"}]
      };
      getLibraryWithGamesStub.mockResolvedValue(testLibraryPreview);

      const testLibrary = 
      {
        id: "123",
        name: "Want to Play",
        games: [], // empty because we don't need it for the test and I don't want to include whole GameInstance objects
        createDate: new Date()
      };

      renameLibraryStub.mockResolvedValue({...testLibrary, name: "New Name"});
      render(<LibraryPage libraryId="123" />);
    });
  };

  beforeEach(async () => {
    await setup();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders library title', async () => {
    await act(async () => {
      await waitFor(() => {
        const title = screen.getByText(/Want to Play/i);
        expect(title).toBeInTheDocument();
      });
    });
  });

  it('renders game title', async () => {
    await act(async () => {
      await waitFor(() => {
        const title = screen.getByText(/Disco Elysium/i);
        expect(title).toBeInTheDocument();
      });
    });
  });

  it('renders edit button', async () => {
    await act(async () => {
      await waitFor(() => {
        expect(screen.getByTestId('edit')).toBeInTheDocument();
      });
    });
  });

  describe('when we click the edit button', () => {
    beforeEach(async () => {
      await act(async () => {
        fireEvent.click(screen.getByTestId('edit'));
      });
    });

    it('the edit input appears', async () => {
      await act(async () => {
        await waitFor(() => {
          expect(screen.getByTestId('libraryName')).toBeInTheDocument();
        });
      });
    });

    describe('and when we type the name and submit', () => {
      beforeEach(async () => {
        await act(async () => {
          fireEvent.change(screen.getByTestId('libraryName'), { target: { value: 'New Name' } });
          fireEvent.click(screen.getByRole('button', { name: 'submit' }));
        });
      });

      it('calls the renameLibraryStub', () => {
        expect(renameLibraryStub).toHaveBeenCalled();
      });

      it('displays the new name', async () => {
        await waitFor(() => {
          expect(screen.getByText('New Name')).toBeInTheDocument();
        });
      });
    });

    describe('and when we click cancel', () => {
      beforeEach(async () => {
        await act(async () => {
          fireEvent.click(screen.getByRole('button', { name: 'cancel' }));
        });
      });

      it('does not call the renameLibraryStub', () => {
        expect(renameLibraryStub).not.toHaveBeenCalled();
      });

      it('displays the old name and edit button', async () => {
        await waitFor(() => {
          expect(screen.queryByTestId('libraryName')).not.toBeInTheDocument();
          expect(screen.getByTestId('edit')).toBeInTheDocument();
          expect(screen.getByText('Want to Play')).toBeInTheDocument();
        });
      });
    });
  });
});