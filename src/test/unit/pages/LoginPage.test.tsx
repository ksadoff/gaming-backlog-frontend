import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import * as userApi from "../../../api/userApi";
import LoginPage from '../../../pages/LoginPage';


jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const mockedUseNavigate = jest.requireMock('react-router-dom').useNavigate;

jest.mock('../../../api/userApi');

const mockedUserApi = userApi as jest.Mocked<typeof userApi>;

describe('Login Component', () => {
  it('renders login form', () => {
    const { getByLabelText, getByRole, getAllByText } = render(<LoginPage />);
    
    expect(getAllByText('Log in')).toHaveLength(2);
    expect(getByLabelText('Email:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Log in' })).toBeInTheDocument();
  });

  it('submits form successfully', async () => {
    const mockedNavigate = jest.fn();
    mockedUseNavigate.mockReturnValue(mockedNavigate);

    const { getByLabelText, getByRole, getByText } = render(<LoginPage />);

    fireEvent.change(getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'password123' } });

    mockedUserApi.authenticateUser.mockResolvedValue({ displayName: "user", email: "user@test.com", id: 'user123' });

    act(() => {
      fireEvent.click(getByRole('button', { name: 'Log in' }));
    });

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/libraries/');
    });
  });

  it('displays error message on failed submission', async () => {
    const { getByLabelText, getByRole, getByText } = render(<LoginPage />);
    
    mockedUserApi.authenticateUser.mockResolvedValue(undefined);

    fireEvent.change(getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'password123' } });

    fireEvent.click(getByRole('button', { name: 'Log in' }));

    await waitFor(() => {
      expect(getByText("Couldn't log in, try again.")).toBeInTheDocument();
    });
  });
});
