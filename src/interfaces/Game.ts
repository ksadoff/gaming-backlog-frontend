export default interface Game {
    id: string;
    name: string; 
    platforms: Array<string>;
    genres: Array<string>;
    franchises?: Array<string>;
    companies: Array<string>;
    releaseDate: Array<string>;
    summary: string;
    images: Array<string>;
}
