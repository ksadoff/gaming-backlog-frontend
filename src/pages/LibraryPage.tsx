import React, { useEffect, useState } from "react";
import FilterMenu from "../components/FilterMenu";
import LibraryPreview from "../interfaces/LibraryPreview";
import GamePreview from "../interfaces/GamePreview";
import * as libraryApi from "../api/libraryApi";

interface LibraryPageProps {
    libraryId: string;
}

/*The page representing a specific library (e.g. Completed Games) */
export default function LibraryPage({ libraryId }: LibraryPageProps) {
    const [currentLibrary, setCurrentLibrary] = useState<LibraryPreview>();
    const [currentGames, setCurrentGames] = useState<Array<GamePreview>>([]);

    useEffect(() => {
        // set currentLibrary to Played Games
        const fetchLibraries = async () => {
            const currentLibrary : LibraryPreview = await libraryApi.getLibraryWithGames(libraryId);
            setCurrentLibrary(currentLibrary);
            setCurrentGames(currentLibrary?.games || []);
        }

        fetchLibraries();
    }, [libraryId])

    useEffect(() => {
        setCurrentGames(currentLibrary?.games || []);
    }, [currentLibrary]);

    return(
        <div>
            <h1>{currentLibrary?.name}</h1>
                <FilterMenu/>
                <div>
                    {(currentGames.map((game) => {
                        // TODO: Add routing to link to game page
                        return  <p>{game.name}</p>;
                     })
                    )}
            </div>
        </div>
    )
}
