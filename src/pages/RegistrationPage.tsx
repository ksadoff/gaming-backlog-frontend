import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import UserRequest from '../interfaces/UserRequest';
import * as userApi from "../api/userApi";

export default function RegistrationPage() {
    const navigate = useNavigate();

    const [user, setUser] = useState<UserRequest>({
        displayName: '',
        password: '',
        email: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await userApi.registerUser(user); 
        console.log('User registered:', user);
        // Reset the form after submission
        setUser({
            displayName: '',
            password: '',
            email: ''
        });
        navigate("/libraries");
    };

    return (
        <div>
            <h2>User Registration</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="displayName">Display Name: </label>
                    <input
                        type="text"
                        id="displayName"
                        name="displayName"
                        value={user.displayName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button>Register</button>
            </form>
        </div>
    );
};
