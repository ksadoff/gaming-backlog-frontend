export default interface GameInstance {
    name: string 
    platforms: Array<string>
    genres: Array<string>
    franchises: Array<string>
    companies: Array<string>
    releaseDate: Array<string>
    summary: string,
    images: Array<string>,
    rating?: number;
    review?: string;
    ranking?: string;
    yearPlayed?: number;
    yearReceived?: number;
    notes?: string;
    platformsOwnedOn?: Array<string>;
    dateAdded?: Date;
}