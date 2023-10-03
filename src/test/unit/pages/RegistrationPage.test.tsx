import { act, render, fireEvent, screen } from '@testing-library/react';
import RegistrationPage from '../../../pages/RegistrationPage';
import * as userApi from "../../../api/userApi";
import { BrowserRouter } from 'react-router-dom';

const registerUserStub = jest.spyOn(userApi, 'registerUser');
const displayName = 'DoctorWho';
const email = 'doctorwho@tardis.com';
const password = 'twelveisthebest!';
registerUserStub.mockResolvedValue({ id: "1", displayName, password, email })


describe('UserRegistration component', () => {
  test('renders UserRegistration component', () => {
    render(
        <BrowserRouter>
            <RegistrationPage />
        </BrowserRouter>
    );
    expect(screen.getByText('User Registration')).toBeInTheDocument();
  });

  test('allows user to fill out the form', async () => {
    render(
        <BrowserRouter>
            <RegistrationPage />
        </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/display name/i), {
      target: { value: displayName },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: email },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: password },
    });

    expect(screen.getByLabelText(/display name/i)).toHaveValue(displayName);
    expect(screen.getByLabelText(/email/i)).toHaveValue(email);
    expect(screen.getByLabelText(/password/i)).toHaveValue(password);
  });

  test('submits the form with valid data', async () => {
    render(
        <BrowserRouter>
            <RegistrationPage />
        </BrowserRouter>
    );

    await act(async () => {
        fireEvent.change(screen.getByLabelText(/display name/i), {
        target: { value: displayName },
        });
        fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: email },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: password },
        });

        fireEvent.click(screen.getByText(/register/i));
    })
    
    // Check that registerUser was called with the correct inputs
    expect(registerUserStub).toHaveBeenCalledWith({
      displayName,
      email,
      password,
    });

    // Restore the original implementation of registerUser
    registerUserStub.mockRestore();
  });
});