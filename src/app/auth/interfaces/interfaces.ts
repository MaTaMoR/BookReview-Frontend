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

export interface AuthUserResponse {
    username: string;
    name: string;
    surnames: string;
    email: string;
}

export interface AuthUser extends AuthUserResponse {
    token: string;
}
