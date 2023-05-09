import React, { useEffect, useState } from "react";
import FilterMenu from "../components/FilterMenu";
import Library from "../interfaces/Library";
import Game from "../interfaces/Game";
import * as libraryApi from "../api/libraryApi";

interface LibraryPageProps {
    libraryId: string;
}

/*The page representing a specific library (e.g. Completed Games) */
// TODO: How will we fetch libraryId? Query params? Context?
export default function LibraryPage({ libraryId }: LibraryPageProps) {
    const [userLibraries, setUserLibraries] = useState<Array<Library>>([]);
    const [currentLibrary, setCurrentLibrary] = useState<Library>();
    const [currentGames, setCurrentGames] = useState<Array<Game>>([]);

    useEffect(() => {
        // set currentLibrary to Played Games
        const fetchLibraries = async () => {
            const currentLibrary : Library = await libraryApi.getLibrary(libraryId);
            setCurrentLibrary(currentLibrary);
            setCurrentGames(currentLibrary?.games || []);
        }

        fetchLibraries();
    }, [])

    useEffect(() => {
        setCurrentGames(currentLibrary?.games || []);
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
