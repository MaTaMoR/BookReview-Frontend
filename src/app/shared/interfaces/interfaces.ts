import {CategoryResponse} from "../../books/interfaces/interfaces";
import {Observable} from "rxjs";

export interface SearchData {
    search: string;
    categories: CategoryResponse[];
}

export interface AuthData {
    tab: "login" | "register";
}

export interface DataProvider<T> {

    getData: (value: string) => Observable<T[]>;

}

export interface AuthRegisterRequest {
    username: string;
    name: string;
    surnames: string;
    email: string;
    password: string;
}

export interface AuthLoginRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface AuthUserImage {
    id: string;
    name: string;
    type: string;
}

export interface AuthUserResponse {
    username: string;
    name: string;
    surnames: string;
    email: string;
    image: AuthUserImage;
}

export interface AuthUser extends AuthUserResponse {
    token: string;
}
