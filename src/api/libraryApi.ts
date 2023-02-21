import Library from "../interfaces/Library";

//TODO: http://localhost:8080/path_to_resource

function getAllLibraries(): Promise<Library[]> {
    return fetch("/libraries", {
        method: "GET",
    })
    .then((response) => response.json());
}

function getLibrary(id: string): Promise<Library> {
    return fetch(`/libraries/${id}`, {
        method: "GET",
    })
    .then((response) => response.json());
}

function createLibrary(library: Library): Promise<Library> {
    return fetch("/libraries", {
        method: "POST",
        body: JSON.stringify(library),
    })
    .then((response) => response.json());
}
