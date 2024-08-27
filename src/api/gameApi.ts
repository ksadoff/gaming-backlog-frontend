import {homeUrl, gamesBaseUrl, gameInstancesBaseUrl, librariesBaseUrl} from "../constants/Routes";
import Game from "../interfaces/Game";
import GameInstance from "../interfaces/GameInstance";
import GameInstanceRequest from "../interfaces/GameInstanceRequest";
import GamePreview from "../interfaces/GamePreview";

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

export const updateGameInstance = async (id: string, game: GameInstanceRequest): Promise<String> => {
    const response = await fetch(homeUrl + gameInstancesBaseUrl + `${id}`, {
        method: "PATCH",
        body: JSON.stringify(game),
        headers: {
            "Content-Type": "application/json",
        }
        });
    return response.statusText
}

export const searchGamesBySubstring = async (substring: string): Promise<Array<GamePreview>> => {
    const response = await fetch(homeUrl + gamesBaseUrl + 'search/'+substring, {
        method: "GET",
    });
    return await response.json();
}
