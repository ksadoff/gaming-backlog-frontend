import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as userApi from "../api/userApi";
import { librariesBaseUrl } from '../constants/Routes';
import { useUser } from '../UserContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUserId } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const redirectToUserDefaultLibrary = (userId: string) => {
    // TODO: This will redirect to the user's specific libraries page after GB-60
    navigate('/' + userId + '/' + librariesBaseUrl)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const authedUser = await userApi.authenticateUser({ email, password });
    // Reset the form fields
    setEmail('');
    setPassword('');

    if (authedUser) {
      setUserId(authedUser.id)
      redirectToUserDefaultLibrary(authedUser.id);
    } else {
      setError("Couldn't log in, try again.")
    }
  };

  return (
    <div>
      <h2>Log in</h2>
      <p>{error}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
