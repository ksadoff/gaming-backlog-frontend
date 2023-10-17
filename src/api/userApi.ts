import { homeUrl, usersBaseUrl } from "../constants/Routes";
import User from "../interfaces/User";
import UserRequest from "../interfaces/UserRequest";
import { UserResponse } from "../interfaces/UserResponse";

export function getUser(id: string): Promise<User> {
    return fetch(homeUrl + usersBaseUrl + `${id}`, {
        method: "GET"
    })
    .then((response) => response.json())
    .catch(err => console.log(err));
}

export function registerUser(user: UserRequest): Promise<UserResponse> {
    return fetch(homeUrl + usersBaseUrl, {
        method: "POST",
        body: JSON.stringify(user),
        headers: new Headers({'content-type': 'application/json'})
    })
    .then((response) => response.json())
    .catch(err => console.log(err));
}

export function authenticateUser(user: UserRequest): Promise<UserResponse | undefined> {
    return fetch(homeUrl + usersBaseUrl + `login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: new Headers({'content-type': 'application/json'})
    })
    .then((response) => response.json())
    .catch(err => console.log(err));
}
