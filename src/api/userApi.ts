import { homeUrl, usersBaseUrl } from "../constants/ApiConstants";
import User from "../interfaces/User";

export function getUser(id: string): Promise<User> {
    return fetch(homeUrl + usersBaseUrl + `${id}`, {
        method: "GET",
    })
    .then((response) => response.json())
    .catch(err => console.log(err));
}
