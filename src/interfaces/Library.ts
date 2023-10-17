import Game from "./Game";

export default interface Library {
    id: string;
    name: string;
    games: Array<Game>;
    createDate: Date;
}
