import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import * as userApi from '../../../api/userApi';
import TopNav from '../../../components/TopNav';


jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const mockedUseNavigate = jest.requireMock('react-router-dom').useNavigate;

jest.mock('../../../api/userApi');

const mockedUserApi = userApi as jest.Mocked<typeof userApi>;

describe('TopNav Component', () => {
  it('renders logout button', () => {
    const { getByRole } = render(<TopNav />);
    
    expect(getByRole('button', { name: 'Log out' })).toBeInTheDocument();
  });

  it('submits logout request successfully', async () => {
    const mockedNavigate = jest.fn();
    mockedUseNavigate.mockReturnValue(mockedNavigate);

    const { getByRole } = render(<TopNav />);

    mockedUserApi.logout.mockResolvedValue('Successfully logged out user testusername');

    act(() => {
      fireEvent.click(getByRole('button', { name: 'Log out' }));
    });

    await waitFor(() => {
        expect(mockedUserApi.logout).toHaveBeenCalledWith('testusername');
        expect(mockedNavigate).toHaveBeenCalledWith('/login');
    });
  });
});
