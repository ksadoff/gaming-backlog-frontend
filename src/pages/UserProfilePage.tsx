import {ChangeEvent, FormEvent, useEffect, useState} from 'react';

import * as userApi from "../api/userApi";
import UserRequest from "../interfaces/UserRequest";

interface UserProfile {
  displayName: string;
  email: string;
}

interface UserId {
    id: string;
}

interface PasswordState {
    oldPassword: string;
    newPassword: string;
    verifyPassword: string;
}

export default function UserProfilePage({id}: UserId) {
    const [userProfile, setUserProfile] = useState<UserProfile>({displayName: "", email: ""});
    const [passwordState, setPasswordState] = useState<PasswordState>(
        { oldPassword: "", newPassword: "", verifyPassword: "" }
    )

    useEffect(() => {
        const fetchUser = async () => {
            const user = await userApi.getUser(id);
            setUserProfile({displayName: user.displayName, email: user.email});
        }

        fetchUser();
    }, []);

  const handlePasswordChange = async (e: FormEvent) => {
      e.preventDefault();
      if (passwordState.newPassword !== passwordState.verifyPassword) {
          alert("New passwords do not match")
      }
      else {
          const oldUser = await userApi.getUser(id, true)
          if (oldUser.password !== passwordState.oldPassword) {
              alert("Old password is incorrect.")
          }
          else {
              const newUser: UserRequest = {
                  displayName: oldUser.displayName,
                  email: oldUser.email,
                  password: passwordState.newPassword
              }
              await userApi.updateUser(id, newUser)
              console.log("Password changed.")
          }
      }
      setPasswordState({ oldPassword: "", newPassword: "", verifyPassword: "" })
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const { name, value } = e.target;
      setPasswordState((prevState) => ({ ...prevState, [name]: value}))
  }

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
            Current Password:
              <input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  value={passwordState.oldPassword}
                  onChange={handleChange}
                  required
              />
          </label>
          <br />
          <label>
            New Password:
              <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordState.newPassword}
                  onChange={handleChange}
                  required
              />
          </label>
          <br />
          <label>
            Confirm New Password:
              <input
                  id="verifyPassword"
                  name="verifyPassword"
                  type="password"
                  value={passwordState.verifyPassword}
                  onChange={handleChange}
                  required
              />
          </label>
          <br />
          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
};
