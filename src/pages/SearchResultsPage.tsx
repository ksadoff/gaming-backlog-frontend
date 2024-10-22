import { useState } from "react";
import * as gameApi from "../api/gameApi";
import GamePreview from "../interfaces/GamePreview";
import { MdSearch } from "react-icons/md";
import TopNav from "../components/TopNav";
import { homeUiUrl } from "../constants/Routes";

export default function SearchResultsPage() {
    const [searchResult, setSearchResult] = useState<GamePreview>();
    const [searchTerm, setSearchTerm] = useState<string>("")

    const searchGames = async () => {
        const result = await gameApi.getGameByName(searchTerm);
        setSearchResult(result);
    }

    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
      };

    return(
        <>
        <TopNav hideSearch/>
        <h1>Search Results</h1>
        <div>
            <input value={searchTerm} onChange={handleSearchTermChange}/>
            <button onClick={searchGames}><MdSearch/></button>
        </div>
            {searchResult ? (
                <div key={searchResult?.id}>
                {<a href={`${homeUiUrl}`+"games/"+`${searchResult.id}`}>{searchResult?.name}</a>}
            </div>
            ) :
            <p>No games found</p>}
        </>
    )
}
