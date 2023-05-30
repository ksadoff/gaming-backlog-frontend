import { GameCard } from "../components/GameCard";
import React from "react";

interface GamePageProps {
    id: string;
}

export default function GamePage({ id }: GamePageProps) {

    const getTitle = () => {
        //TODO: fetch title from API
        return "Knights of the Old Republic";
    }

    const getImage = () => {
        //TODO: fetch image from API 
    }

    const getDescription = () => {
        //TODO: fetch description from API
        return "The best Star Wars Game";
    }

    return (
    // We'll want a page header at some point
    <GameCard gameTitle={getTitle()} gameImage={getImage()} gameDescription={getDescription()}/>
    )
}
