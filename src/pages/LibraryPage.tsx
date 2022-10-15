import React, { useEffect, useState } from "react";
import FilterMenu from "../components/FilterMenu";
import { Library } from "../interfaces/Library";
import { Game } from "../interfaces/Game";

export default function LibraryPage() {
    const [userLibraries, setUserLibraries] = useState<Array<Library>>([]);
    const [currentLibrary, setCurrentLibrary] = useState<Library>();
    const [currentGames, setCurrentGames] = useState<Array<Game>>([]);

    useEffect(() => {
        //TODO: Call API to fetch user libraries on page load
        // set currentLibrary to Played Games
    }, [])

    useEffect(() => {
        //TODO Call API to fetch Game objects from current library
        // set currentGames
    }, [currentLibrary]);

    return(
        <div>
            <h1>My Library</h1>
                <FilterMenu/>
                <div>
                    {(currentGames.map((game) => {
                        // TODO: Add routing to link to game page
                        return <img src={game.image}/>;
                     })
                    )}
            </div>
        </div>
    )
}
