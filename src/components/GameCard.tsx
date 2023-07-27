import React, {useEffect, useState} from "react";
import Select from 'react-select'

// components
import OpenLibraryModalButton from "./OpenLibraryModalButton";
import * as libraryApi from "../api/libraryApi";

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

interface LibraryOption {
    label: string,
    value: string
}

export function GameCard(gameCardProps : GameCardProps ) {
    const [libraryOptions, setAllLibraryOptions] = useState<Array<LibraryOption>>([])
    const [selectedLibrary, setSelectedLibrary] = useState("")

    const fetchAllLibraries = async () => {
        const libraries = await libraryApi.getAllLibraries()
        const libraryOptions = new Array<LibraryOption>()
        libraries.forEach((library) => {
            libraryOptions.push({ label: library.name, value: library.id })
        } )
        setAllLibraryOptions(libraryOptions)
    }

    const addToLibrary = async (gameId: string, libraryId: string) => {
        if (libraryId === "") {
            alert("No library selected!")
            return
        }
        // todo: need to check if it's an instance or game
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
                <Select
                    placeholder="Select a Library"
                    options={libraryOptions}
                    onMenuOpen={() => fetchAllLibraries()}
                    onChange={(library) => setSelectedLibrary(library!!.value)}
                />
                <OpenLibraryModalButton text="Add to Library" onClick={() => addToLibrary(gameCardProps.gameId, selectedLibrary)}/>
            </div>
        </div>
    )
}
