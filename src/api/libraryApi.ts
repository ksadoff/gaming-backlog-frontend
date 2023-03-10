import Library from "../interfaces/Library";
import LibraryPreview from "../interfaces/LibraryPreview";

// TODO: We eventually want this to be get all libraries for a single user? Will have to update backend endpoints
export function getAllLibraries(): Promise<LibraryPreview[]> {
    return fetch("http://localhost:8080/libraries/", {
        method: "GET",
    })
    .then((response) => {
        console.log(response);
        return response.json()
    })
    .catch(err => console.log(err));
}

export function getLibrary(id: string): Promise<Library> {
    return fetch(`http://localhost:8080/libraries/${id}/`, {
        method: "GET",
    })
    .then((response) => response.json())
    .catch(err => console.log(err));
}

export function createLibrary(library: Library): Promise<Library> {
    return fetch("http://localhost:8080/libraries/", {
        method: "POST",
        body: JSON.stringify(library),
    })
    .then((response) => response.json());
}
