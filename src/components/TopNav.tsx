import SearchBar from "./SearchBar";
import * as userApi from "../api/userApi";
import { useNavigate } from 'react-router-dom';

// TODO: We will need to populate the user via context on all pages.
// We do not have any kind of store set up yet, so leaving this commented for now.
interface TopNavProps {
//     user: User;
    hideSearch?: boolean;
}


export default function TopNav({hideSearch = false}: TopNavProps) {
    const navigate = useNavigate();

    const logout = () => {
        userApi.logout("testusername")
        // TODO: Eventually we will want this redirect on the backend
        navigate('/login')
    }

    return (
        <>
            <div style={{width: "100%", display: "flex"}}>
                {!hideSearch && <SearchBar/>}
                {/* Slight hack to get even spacing */}
                <div style={{flexGrow: 1}}/>
                <button onClick={logout}>Log out</button>
            </div>
        </>    
    )
}
