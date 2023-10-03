import GamePreview from "./GamePreview";

export default interface Library {
    id: string;
    name: string;
    games: Array<GamePreview>;
}
