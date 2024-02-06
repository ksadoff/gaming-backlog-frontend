import GameInstance from "./GameInstance";

export default interface LibraryRequest {
    name: string;
    games?: Array<GameInstance>;
}
