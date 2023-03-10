import React, { useEffect, useState } from "react";
import * as libraryApi from "../api/libraryApi";
// import OpenLibraryModalButton from "../components/OpenLibraryModalButton";
import LibraryPreview from "../interfaces/LibraryPreview";

/*The page representing all of a user's libraries*/
export default function LibrariesPage() {
    const [userLibraries, setUserLibraries] = useState<Array<LibraryPreview>>([]);
    const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);

    useEffect(() => {
        const fetchLibraries = async () => {
            const libraries = await libraryApi.getAllLibraries();
            setUserLibraries(libraries);
        }

        fetchLibraries();
    }, [])

    const getFirstFiveGames = (preview: LibraryPreview ) => {
        if (preview.games.length < 5) {
            return (
                <div>
                    {(preview.games.map((game) => 
                    <a>
                        <p>{game.name}</p>
                    </a>))}
                </div>
            )
        } else {
            const list = [];
            for (let i = 0; i < 5; i++) {
                list.push(
                <a>
                    <p>{preview.games[i].name}</p>
                </a>)
            }
            return list;
        }


    }
    
    return(
        <div>
            {(userLibraries.map((preview) => {
                // TODO: Add routing to link to game page
                return <div>
                    <h1>{preview.name}</h1>
                        {/* For now we'll render the first 5 games in each library */}
                        {/* TODO: game icon should link to game page? We'll need to include icon in the game response from the backend */}
                        {getFirstFiveGames(preview)}
                </div>;
                })
            )}
        </div>
        // <OpenLibraryModalButton text="+" onClick={() => setIsLibraryModalOpen(true)}/>
        //TODO: GB-56 Add modal
    )
}