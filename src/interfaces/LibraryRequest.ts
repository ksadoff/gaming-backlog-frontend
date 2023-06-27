import Game from "./Game";

export default interface LibraryRequest {
    name: string,
    games?: Array<Game>,
}
