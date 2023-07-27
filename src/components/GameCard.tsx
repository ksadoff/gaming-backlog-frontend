import React from "react";

// components
import OpenLibraryModalButton from "./OpenLibraryModalButton";

// TODO: create game page to use this card
// for right now assume all info comes from game API
interface GameCardProps {
    gameName: string;
    gameImage: any;
    gameSummary: string;
    gamePlatforms: Array<string>;
    gameGenres: Array<string>;
    gameFranchises: Array<string>;
    gameCompanies: Array<string>;
    gameReleaseDate: Array<string>;
    gameRating?: number;
    gameReview?: string;
    gameRanking?: string;
    yearPlayed?: number;
    yearReceived?: number;
    notes?: string;
    platformsOwnedOn?: Array<string>;
    dateAdded?: Date;

}

export function GameCard(gameCardProps : GameCardProps ) {
    // will eventually be an API function
    const addToLibrary = () => true;

    return (
        <div>        
            <h1>{gameCardProps.gameName}</h1>
            <img 
            src = {gameCardProps.gameImage[0]}
            alt = "Game"
            />
            <p>{gameCardProps.gameSummary}</p>
            <div>
                {(gameCardProps.gamePlatforms.map((platform) => {
                    return <p>{platform}</p>
                }))}
            </div>
            <div>
                {(gameCardProps.gameGenres.map((genre) => {
                    return <p>{genre}</p>
                }))}
            </div>
            <div>
                { gameCardProps.gameFranchises ?
                (gameCardProps.gameFranchises.map((franchise) => {
                    return <p>{franchise}</p>
                }))
                 : null }
            </div>
            <div>
                {(gameCardProps.gameCompanies.map((company) => {
                    return <p>{company}</p>
                }))}
            </div>
            <div>
                {(gameCardProps.gameReleaseDate.map((date) => {
                    return <p>{date}</p>
                }))}
            </div>
            <p>{gameCardProps?.gameRating}</p>
            <p>{gameCardProps?.gameReview}</p>
            <p>{gameCardProps?.gameRanking}</p>
            <p>{gameCardProps?.yearPlayed}</p>
            <p>{gameCardProps?.yearReceived}</p>
            <p>{gameCardProps?.notes}</p>
            <div>
                {(gameCardProps.platformsOwnedOn?.map((platform) => {
                    return <p>{platform}</p>
                }))}
            </div>
            <p>{gameCardProps?.dateAdded?.toDateString()}</p>
            <div>
                <OpenLibraryModalButton text="Add to Library" onClick={addToLibrary}></OpenLibraryModalButton>
            </div>
            {/* TODO: GB-56 Add modal here */}

        </div>
    )
}
