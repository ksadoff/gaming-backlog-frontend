import GameInstance from "./GameInstance";

export default interface Library {
    id: string;
    name: string;
    games: Array<GameInstance>;
    createDate: Date;
}
