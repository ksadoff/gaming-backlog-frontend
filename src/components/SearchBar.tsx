import { useState } from 'react';
import SubmitButton from "./SubmitButton";

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
            <SubmitButton text="Submit Search" onClick={() => sendSearchQuery(value)}/>
        </div>
    );

}

export default SearchBar;