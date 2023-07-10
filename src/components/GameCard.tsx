import React from "react";

// components
import OpenLibraryModalButton from "./OpenLibraryModalButton";
import * as libraryApi from "../api/libraryApi";

// TODO: create game page to use this card
// for right now assume all info comes from game API
interface GameCardProps {
    gameId: string;
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
    // when we have users in place, make library id dynamic
    const addToLibrary = async (gameId: string, libraryId: string) => {
        await libraryApi.addToLibrary(gameId, libraryId)
    };

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
                {(gameCardProps.gameFranchises.map((franchise) => {
                    return <p>{franchise}</p>
                }))}
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
                <OpenLibraryModalButton text="Add to Library" onClick={() => addToLibrary(gameCardProps.gameId, "621d8c08b04b379ef6c12286")}></OpenLibraryModalButton>
            </div>
            {/* TODO: GB-56 Add modal here */}

        </div>
    )
}
