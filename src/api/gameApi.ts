import { homeUrl, gamesBaseUrl, gameInstancesBaseUrl } from "../constants/ApiConstants";
import Game from "../interfaces/Game";

// TODO: most likely, game instance ids will be passed from library.

export const getGame = async (id: string): Promise<Game> => {
    console.log("shouldn't be here")
    const response = await fetch(homeUrl + gamesBaseUrl + `${id}`, {
        method: "GET",
    });
    return await response.json();
}

export const getGameInstance = async (id: string): Promise<Game> => {
    const response = await fetch(homeUrl + gameInstancesBaseUrl + `${id}`, {
        method: "GET",
    });
    return await response.json();
}
