import { useState } from 'react';
import OpenLibraryModalButton from "./OpenLibraryModalButton";

const SearchBar = () => {
    const [value, setValue] = useState('');

    // TODO: implement actual search functionality
    const sendSearchQuery = (query: string) => {
        console.log(query)
        setValue('')
    }

    return (
        <div>
            <input
                type="text"
                className={"searchBar"}
                placeholder="Search games..."
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
            <OpenLibraryModalButton text="Submit Search" onClick={() => sendSearchQuery(value)}/>
        </div>
    );

}

export default SearchBar;