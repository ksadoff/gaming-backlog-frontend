import { Platforms } from "../constants/Platforms"

export default interface GameInstanceRequest {
    rating?: number;
    review?: string;
    ranking?: string;
    yearPlayed?: number;
    yearReceived?: number;
    notes?: string;
    platformsOwnedOn?: Array<string>; // TODO: will want to change to Platform enum
}
