import { homeUrl, librariesBaseUrl } from "../constants/ApiConstants";
import Library from "../interfaces/Library";
import LibraryPreview from "../interfaces/LibraryPreview";
import LibraryRequest from "../interfaces/LibraryRequest";

export function getAllLibrariesWithGames(): Promise<Library[]> {
    return fetch(homeUrl + librariesBaseUrl + "withGames", {
        method: "GET",
    })
    .then((response) => response.json())
    .catch(err => console.log(err));
}

export function getLibrary(id: string): Promise<Library> {
    return fetch(homeUrl + librariesBaseUrl + `${id}`, {
        method: "GET",
    })
    .then((response) => response.json())
    .catch(err => console.log(err));
}

export function getLibraryWithGames(id: string): Promise<LibraryPreview> {
    return fetch(homeUrl + librariesBaseUrl + `${id}/withGames`, {
        method: "GET",
    })
    .then((response) => response.json())
    .catch(err => console.log(err));
}

export function createLibrary(library: LibraryRequest): Promise<LibraryRequest> {
    return fetch(homeUrl + librariesBaseUrl, {
        method: "POST",
        body: JSON.stringify(library),
        headers: {
            "Content-Type": "application/json",
          },
    })
    .then((response) => response.json())
    .catch(err => console.log(err));
}
