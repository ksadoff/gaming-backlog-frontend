import React from "react";

// components
import AddToLibraryButton from "./AddToLibraryButton";
// TODO: create game page to use this card
// for right now assume all info comes from game API
interface GameCardProps {
    gameTitle: string;
    gameImage: any;
    gameDescription: string;
}

export function GameCard({gameTitle, gameImage, gameDescription } : GameCardProps ) {
    // will eventually be an API function
    const addToLibrary = () => true;

    return (
        <div>        
            <h1>{gameTitle}</h1>
            <svg>{gameImage}</svg>
            <p>{gameDescription}</p>
            <div>
                <AddToLibraryButton text="Add to Library" onClick={addToLibrary}></AddToLibraryButton>
            </div>
        </div>
    )
}
