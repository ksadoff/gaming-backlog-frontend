import { useState } from 'react';
import SubmitButton from "./SubmitButton";
import * as gameApi from "../api/gameApi"

const SearchBar = () => {
    const [value, setValue] = useState('');

    // TODO: implement actual search functionality
    const sendSearchQuery = (query: string) => {
        setValue(query)
        gameApi.getGameByName(query);
    }

    return (
        <>
            <input
                type="text"
                className={"searchBar"}
                placeholder="Search games..."
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
            <SubmitButton text="Submit Search" onClick={() => sendSearchQuery(value)}/>
        </>
    );

}

export default SearchBar;
