import React, { useEffect, useState } from "react";
import * as libraryApi from "../api/libraryApi";
import OpenLibraryModalButton from "../components/OpenLibraryModalButton";
import LibraryPreview from "../interfaces/LibraryPreview";
import Game from "../interfaces/Game";
import GamePreview from "../interfaces/GamePreview";
import { homeUiUrl } from "../constants/ApiConstants";
import CreateLibraryModal from "../components/CreateLibraryModal";
import LibraryRequest from '../interfaces/LibraryRequest';

/*The page representing all of a user's libraries*/
export default function LibrariesPage() {
    const [userLibraries, setUserLibraries] = useState<Array<LibraryPreview>>([]);
    const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);

    const onCreateNewLibrary = async (libraryName: string) => {
        const libraryToCreate: LibraryRequest = {
            name: libraryName,
            games: [], // for now we only support creating empty library
        };

        const updatedLibraries = userLibraries;
        const newLibrary = await libraryApi.createLibrary(libraryToCreate);
        updatedLibraries.push(newLibrary);
        setUserLibraries(updatedLibraries);
    }
    const gamesToPreviews = (games: Array<Game>) => {
        const gamePreviews = new Array<GamePreview>();
        games.forEach(game => gamePreviews.push({ id: game.id, name: game.name}));
        return gamePreviews;
    }

    useEffect(() => {
        const fetchLibraries = async () => {
            const libraries = await libraryApi.getAllLibrariesWithGames();
            console.log(libraries)
            const libraryPreviews = new Array<LibraryPreview>;
            libraries.forEach(library => libraryPreviews.push({ id: library.id, name: library.name, games: gamesToPreviews(library.games) }))
            setUserLibraries(libraryPreviews);
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
        <>
            <h1>
                Libraries 
            </h1>
            <div>
                {(userLibraries.map((preview) => {
                    return <div>
                        <h1 style={{zIndex: 10}}>
                            <a href={`${homeUiUrl}`+"libraries/"+preview.id}>{preview.name}</a>
                        </h1>
                            {/* For now we'll render the first 5 games in each library */}
                            {/* TODO: game icon should link to game page? We'll need to include icon in the game response from the backend */}
                            {getFirstFiveGames(preview)}
                    </div>;
                    })
                )}
            </div>
            <OpenLibraryModalButton text="Create Library" onClick={() => setIsLibraryModalOpen(true)}/>
            <CreateLibraryModal isOpen={isLibraryModalOpen} onClose={() => setIsLibraryModalOpen(false)} onSubmit={onCreateNewLibrary}/>
            </>
    )
}
