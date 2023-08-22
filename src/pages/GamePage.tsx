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

    const getName = () => {
        return currentGame?.name || ""
    }

    const getImage = ()  => {
        return currentGame?.images || [];
    }

    const getSummary = () => {
        return currentGame?.summary || "";
    }

    const getPlatforms = () => {
        return currentGame?.platforms || []
    }

    const getGenres = () => {
        return currentGame?.genres || []
    }

    const getFranchises = () => {
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
        gameId={gameId}
        gameName= {getName()}
        gameImage={getImage()}
        gameSummary={getSummary()}
        gamePlatforms = {getPlatforms()}
        gameGenres = {getGenres()}
        gameFranchises= {getFranchises()}
        gameCompanies = {getCompanies()}
        gameReleaseDate = {getReleaseDate()}
    />
    )
}
