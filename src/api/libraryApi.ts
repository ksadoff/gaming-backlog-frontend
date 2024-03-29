import { homeUrl, librariesBaseUrl } from "../constants/Routes";
import Library from "../interfaces/Library";
import LibraryPreview from "../interfaces/LibraryPreview";
import LibraryRequest from "../interfaces/LibraryRequest";

export function getAllLibrariesWithGames(): Promise<Library[]> {
    return fetch(homeUrl + librariesBaseUrl + "withGames", {
        method: "GET"
    })
    .then((response) => response.json())
    .catch(err => console.log(err));
}

export function getAllLibraries(): Promise<Library[]> {
    return fetch(homeUrl + librariesBaseUrl, {
        method: "GET"
    })
        .then((response) => response.json())
        .catch(err => console.log(err));
}

export function getLibrary(id: string): Promise<Library> {
    return fetch(homeUrl + librariesBaseUrl + `${id}`, {
        method: "GET"
    })
    .then((response) => response.json())
    .catch(err => console.log(err));
}

export function getLibraryWithGames(id: string): Promise<LibraryPreview> {
    return fetch(homeUrl + librariesBaseUrl + `${id}/withGames`, {
        method: "GET"
    })
    .then((response) => response.json())
    .catch(err => console.log(err));
}

export function createLibrary(library: LibraryRequest): Promise<Library> {
    return fetch(homeUrl + librariesBaseUrl, {
        method: "POST",
        body: JSON.stringify(library),
        headers: {
            "Content-Type": "application/json",
          }
    })
    .then((response) => response.json())
    .catch(err => console.log(err));
}

export function addToLibrary(gameId: string, libraryId: string): Promise<any> {
    return fetch(homeUrl + librariesBaseUrl  + `${libraryId}/games`, {
        method: "POST",
        body: JSON.stringify({
            "gameId": gameId
        }),
        headers: new Headers({'content-type': 'application/json'})
    })
        .then((response) => response.statusText)
        .catch(err => console.log(err));
}

