import { useState } from "react";
import * as gameApi from "../api/gameApi";
import GamePreview from "../interfaces/GamePreview";
import { MdSearch } from "react-icons/md";
import TopNav from "../components/TopNav";

export default function SearchResultsPage() {
    const [searchResults, setSearchResults] = useState<Array<GamePreview>>([]);
    const [searchTerm, setSearchTerm] = useState<string>("")

    const searchGames = async () => {
        const results = await gameApi.searchGamesBySubstring(searchTerm);
        setSearchResults(results);
    }

    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
      };

    return(
        <>
        <TopNav/>
        <div>
            <input value={searchTerm} onChange={handleSearchTermChange}/>
            <button onClick={searchGames}><MdSearch/></button>
        </div>
            <h1>Search Results</h1>
            {(searchResults.map((preview) => {
                return(
                    <div key={preview.id}>
                        {preview.name}
                    </div>
                    )
                })
            )}
        </>
    )
}