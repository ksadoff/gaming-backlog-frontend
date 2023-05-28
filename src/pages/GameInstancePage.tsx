// TODO: this page will be removed with the addition of user-based logic.
// Currently, since we don't have logic in place to determine if a game is added to library or not, for demo purposes
// we will have it separate. This will be in place once we add the necessary logic for users

import { GameCard } from "../components/GameCard";
import React, { useEffect, useState } from "react";
import GameInstance from "../interfaces/GameInstance";
import * as gameApi from "../api/gameApi";

interface GameId {
    gameId: string
}

export default function GameInstancePage({gameId}: GameId) {
    let emptyGame: GameInstance = { name: "", platforms: [], genres: [], franchises: [], companies: [], releaseDate: [], summary: "", images: []}
    const [currentGame, setCurrentGame] = useState<GameInstance>(emptyGame);
    console.log(currentGame)

    useEffect(() => {
        // set currentGame
        const fetchGame = async () => {
            const currentGame : GameInstance = await gameApi.getGameInstance(gameId);
            setCurrentGame(currentGame);
        }

        fetchGame();
    }, [gameId])

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

    const getGameRating = () => {
        return currentGame?.rating || 0
    }

    const getGameReview = () => {
        return currentGame?.review || ""
    }

    const getGameRanking = () => {
        return currentGame?.ranking || ""
    }

    const getYearPlayed = () => {
        return currentGame?.yearPlayed || 0
    }

    const getYearReceived = () => {
        return currentGame?.yearReceived || 0
    }

    const getNotes = () => {
        return currentGame?.notes || ""
    }

    const getPlatformsOwnedOn = () => {
        return currentGame?.platformsOwnedOn || []
    }

    const getDateAdded = () => {
        return currentGame?.dateAdded || ""
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
        gameRating = {getGameRating()}
        gameReview = {getGameReview()}
        gameRanking = {getGameRanking()}
        yearPlayed = {getYearPlayed()}
        yearReceived = {getYearReceived()}
        notes = {getNotes()}
        platformsOwnedOn = {getPlatformsOwnedOn()}
        dateAdded ={getDateAdded()}
    />
    )
}