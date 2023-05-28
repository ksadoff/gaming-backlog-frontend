import { GameCard } from "../components/GameCard";
import React, { useEffect, useState } from "react";
import Game from "../interfaces/Game";
import * as gameApi from "../api/gameApi";

interface GameId {
    gameId: string
}

export default function GamePage({gameId}: GameId) {
    let emptyGame: Game = { name: "", platforms: [], genres: [], franchises: [], companies: [], releaseDate: [], summary: "", images: []}
    const [currentGame, setCurrentGame] = useState<Game>(emptyGame);
    console.log(currentGame)

    useEffect(() => {
        // set currentGame
        const fetchGame = async () => {
            const currentGame : Game = await gameApi.getGame(gameId);
            setCurrentGame(currentGame);
        }

        fetchGame();
    }, [])

    const getTitle = () => {
        return currentGame?.name || ""
    }

    function getImage() {
        console.log(`Current Image: ${currentGame.images}`)
        return currentGame?.images || [];
    }

    function getDescription() {
        return currentGame?.summary || "";
    }

    const getPlatforms = () => {
        return currentGame?.platforms || []
    }

    const getGenres = () => {
        return currentGame?.genres || []
    }

    const getUniverses = () => {
        return currentGame?.franchises || []
    }

    const getCompanies = () => {
        return currentGame?.companies || []
    }
    
    const getReleaseDate = () => {
        return currentGame?.releaseDate || []
    }

    return (
    // We'll want a page header at some point
    <GameCard 
        gameTitle = {getTitle()} 
        gameImage={getImage()} 
        gameDescription={getDescription()}
        gamePlatforms = {getPlatforms()}
        gameGenres = {getGenres()}
        gameUniverses = {getUniverses()}
        gameCompanies = {getCompanies()}
        gameReleaseDate = {getReleaseDate()}
    />
    )
}
