import { act, render, screen, fireEvent } from '@testing-library/react';
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
const mockUpdateUser = jest.spyOn(userApi, "updateUser");

describe('UserProfilePage', () => {
  beforeEach(async () => {
    await act(async () => {
      mockGetUser.mockResolvedValue(mockUser);
      mockUpdateUser.mockResolvedValue(mockUser);
      render(<UserProfilePage id={"123"}/>);
    });
  });

  describe('when rendered', () => {
    it('displays user profile information', async () => {
      const displayNameElement = await screen.findByText(mockUser.displayName);
      const emailElement = await screen.findByText(mockUser.email);
  
      expect(displayNameElement).toBeInTheDocument();
      expect(emailElement).toBeInTheDocument();
    });

    describe('when change password is initiated', () => {
      it('changes password', async () => {
        const currentPasswordInput = screen.getByLabelText(/Current Password:/);
        const newPasswordInput = screen.getAllByLabelText(/New Password:/)[0];
        const confirmNewPasswordInput = screen.getByLabelText(/Confirm New Password:/);
        const changePasswordButton = screen.getByRole('button', { name: "Change Password" });

        expect(currentPasswordInput).toBeInTheDocument();
        expect(newPasswordInput).toBeInTheDocument();
        expect(confirmNewPasswordInput).toBeInTheDocument();
        expect(changePasswordButton).toBeInTheDocument();
    
        await act(async () => {
          fireEvent.change(currentPasswordInput, { target: { value: 'what is security' } });
          fireEvent.change(newPasswordInput, { target: { value: 'newpassword' } });
          fireEvent.change(confirmNewPasswordInput, { target: { value: 'newpassword' } });
          fireEvent.click(changePasswordButton);
        })

        expect(mockUpdateUser).toHaveBeenCalledWith('123', {
          displayName: mockUser.displayName,
          email: mockUser.email,
          password: 'newpassword',
        });
        mockUpdateUser.mockRestore()
      });

      it('should not change password if new and confirm passwords do not match', async () => {
        const currentPasswordInput = screen.getByLabelText(/Current Password:/);
        const newPasswordInput = screen.getAllByLabelText(/New Password:/)[0];
        const confirmNewPasswordInput = screen.getByLabelText(/Confirm New Password:/);
        const changePasswordButton = screen.getByRole('button', { name: "Change Password" });

        fireEvent.change(newPasswordInput, { target: { value: 'newPassword' } });
        fireEvent.change(confirmNewPasswordInput, { target: { value: 'differentPassword' } });
        fireEvent.click(changePasswordButton);

        expect(mockUpdateUser).not.toHaveBeenCalled();
      });
    });
  });
});
