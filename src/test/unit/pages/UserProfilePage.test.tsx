import { render, screen, fireEvent } from '@testing-library/react';
import UserProfilePage from '../../../pages/UserProfilePage';
import * as userApi from '../../../api/userApi';

const mockUser = {
    id: '123',
    displayName: 'Mock User',
    email: 'mock.user@example.com',
    password: 'what is security',
    createdDate: '2023-08-28',
  };
const mockGetUser = jest.spyOn(userApi, 'getUser');

describe('UserProfilePage', () => {
  describe('when rendered', () => {
    beforeEach(() => {
        render(<UserProfilePage id={"123"}/>);
        mockGetUser.mockResolvedValue(mockUser);
    })

    it('displays user profile information', () => {
        const displayNameElement = screen.getByText(/Display Name/);
        const emailElement = screen.getByText(/Email/);
    
        expect(displayNameElement).toBeInTheDocument();
        expect(displayNameElement).toHaveTextContent(/Mock User/);

        expect(emailElement).toBeInTheDocument();
        expect(emailElement).toHaveTextContent(/mock.user@example.com/);
    })
  });

  describe('when change password is initiated', () => {
    beforeEach(() => {
        render(<UserProfilePage id={"123"}/>);
    })

    it('changes password', () => {
        const currentPasswordInput = screen.getByLabelText('Current Password:');
        const newPasswordInput = screen.getByLabelText('New Password:');
        const confirmNewPasswordInput = screen.getByLabelText('Confirm New Password:');
        const changePasswordButton = screen.getByText('Change Password');
    
        // Simulate user input
        fireEvent.change(currentPasswordInput, { target: { value: 'oldpassword' } });
        fireEvent.change(newPasswordInput, { target: { value: 'newpassword' } });
        fireEvent.change(confirmNewPasswordInput, { target: { value: 'newpassword' } });
    
        fireEvent.click(changePasswordButton);
    
        // TODO: Test actual functionality
    });
  });
});
