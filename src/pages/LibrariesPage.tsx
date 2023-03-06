import React, { useEffect, useState } from "react";
import Library from "../interfaces/Library";
import * as libraryApi from "../api/libraryApi";
import OpenLibraryModalButton from "../components/OpenLibraryModalButton";

/*The page representing all of a user's libraries*/
export default function LibrariesPage() {
    const [userLibraries, setUserLibraries] = useState<Array<Library>>([]);
    const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);

    useEffect(() => {
        const fetchLibraries = async () => {
            const libraries = await libraryApi.getAllLibraries();
            setUserLibraries(libraries);
        }

        fetchLibraries();
    }, [])
    
    return(
        <OpenLibraryModalButton text="+" onClick={() => setIsLibraryModalOpen(true)}/>
        //TODO: GB-56 Add modal
    )
    // TODO: GB-57 Render all libraries per designs
    // We'll display the first 5 games added to each library
    // On click we'll redirect to the library (by id)
}
