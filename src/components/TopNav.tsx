import * as userApi from "../api/userApi";
import { useNavigate } from 'react-router-dom';
import SearchBar from "./SearchBar";

// TODO: We will need to populate the user via context on all pages.
// We do not have any kind of store set up yet, so leaving this commented for now.
// interface TopNavProps {
//     user: User;
// }

export default function TopNav() {
    const navigate = useNavigate();

    const logout = () => {
        userApi.logout("testusername")
        // TODO: Eventually we will want this redirect on the backend
        navigate('/login')
    }

    const profile = () => {
        // TODO: Eventually we will want this to be a specific user id
        navigate('/users/id')
    }

    return (
        <div>
            <SearchBar/>
            <button onClick={profile}>Profile</button>
            <button onClick={logout}>Log out</button>
        </div>
    )
}
