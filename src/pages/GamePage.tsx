import { GameCard } from "../components/GameCard";
import React, { useEffect, useState } from "react";
import Game from "../interfaces/Game";
import * as gameApi from "../api/gameApi";

interface GamePageProps {
    gameId: string;
}

export default function GamePage({ gameId }: GamePageProps) {
    let emptyGame: Game = { id: "", name: "", platforms: [], genres: [], franchises: [], companies: [], releaseDate: [], summary: "", images: []}
    const [currentGame, setCurrentGame] = useState<Game>(emptyGame);

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

    const getImage = ()  => {
        return currentGame?.images || [];
    }

    const getDescription = () => {
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
