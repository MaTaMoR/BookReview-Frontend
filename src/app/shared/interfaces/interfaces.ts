import {Observable} from "rxjs";

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

export interface AuthPrivilege {
  id: string;
  name: string;
}

export interface AuthRole {
  id: string;
  name: string;
  privileges: AuthPrivilege[];
}

export interface AuthUser {
  username: string;
  name: string;
  surnames: string;
  email: string;
  image: AuthUserImage;
  roles: AuthRole[];
}
