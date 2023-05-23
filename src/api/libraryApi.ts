import { homeUrl, librariesBaseUrl } from "../constants/ApiConstants";
import Library from "../interfaces/Library";
import LibraryPreview from "../interfaces/LibraryPreview";

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

export function createLibrary(library: Library): Promise<Library> {
    return fetch(homeUrl + librariesBaseUrl, {
        method: "POST",
        body: JSON.stringify(library),
    })
    .then((response) => response.json())
    .catch(err => console.log(err));
}
