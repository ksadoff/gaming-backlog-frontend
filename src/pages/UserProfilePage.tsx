import { useEffect, useState } from 'react';

import * as userApi from "../api/userApi";

interface UserProfile {
  displayName: string;
  email: string;
}

interface UserId {
    id: string;
}

export default function UserProfilePage({id}: UserId) {
    const [userProfile, setUserProfile] = useState<UserProfile>({displayName: "", email: ""});

    useEffect(() => {
        const fetchUser = async () => {
            const user = await userApi.getUser(id);
            setUserProfile({displayName: user.displayName, email: user.email});
        }

        fetchUser();
    }, []);

  const handlePasswordChange = () => {
    // TODO: Implement password change functionality
    console.log('Password change functionality to be implemented.');
  };

  return (
    <div>
      <h1>User Profile</h1>
      <div>
        <p>
          <strong>Display Name: </strong> {userProfile.displayName}
        </p>
        <p>
          <strong>Email: </strong> {userProfile.email}
        </p>
      </div>
      <div>
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordChange}>
          <label>
            Current Password: <input type="password" required />
          </label>
          <br />
          <label>
            New Password: <input type="password" required />
          </label>
          <br />
          <label>
            Confirm New Password: <input type="password" required />
          </label>
          <br />
          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
};
