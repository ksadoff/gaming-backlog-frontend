import { useEffect, useState } from "react";
import FilterMenu from "../components/FilterMenu";
import LibraryPreview from "../interfaces/LibraryPreview";
import GamePreview from "../interfaces/GamePreview";
import * as libraryApi from "../api/libraryApi";
import { MdEdit } from "react-icons/md";

interface LibraryPageProps {
    libraryId: string;
}

/*The page representing a specific library (e.g. Completed Games) */
export default function LibraryPage({ libraryId }: LibraryPageProps) {
    const [currentLibrary, setCurrentLibrary] = useState<LibraryPreview>();
    const [currentGames, setCurrentGames] = useState<Array<GamePreview>>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [libraryName, setLibraryName] = useState('');

    const onSubmitLibraryName = async () => {
        const updatedLibrary = await libraryApi.renameLibrary(libraryName, libraryId);
        setCurrentLibrary(updatedLibrary);
        setIsEditing(false);
    }

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
            {!isEditing ? (
                <h1>
                    {currentLibrary?.name}
                    <button data-testid="edit" onClick={() => setIsEditing(true)}>
                        <MdEdit style={{marginLeft: 10}}/>
                    </button>
                </h1>
            ) : (
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        onSubmitLibraryName()
                      }
                    }>
                        <input data-testid="libraryName" type="text" onChange={(e) => setLibraryName(e.target.value)}/>
                    </form>
                    <button onClick={() => setIsEditing(false)}>cancel</button>
                    <button onClick={onSubmitLibraryName}>submit</button>
                </div>
            )
        }
            <FilterMenu/>
            <div>
                {(currentGames.map((game) => {
                    // TODO: Add routing to link to game page
                    return  <p key={game.name}>{game.name}</p>;
                    })
                )}
            </div>
        </div>
    )
}
