import { homeUrl, gamesBaseUrl, gameInstancesBaseUrl } from "../constants/ApiConstants";
import Game from "../interfaces/Game";
import GameInstance from "../interfaces/GameInstance";

// TODO: most likely, game instance ids will be passed from library.

export const getGame = async (id: string): Promise<Game> => {
    const response = await fetch(homeUrl + gamesBaseUrl + `${id}`, {
        method: "GET"
    });
    return await response.json();
}

export const getGameInstance = async (id: string): Promise<GameInstance> => {
    const response = await fetch(homeUrl + gameInstancesBaseUrl + `${id}`, {
        method: "GET"
    });
    return await response.json();
}
