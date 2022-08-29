import {Action} from "@ngrx/store";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: { email: string, id: string, token: string, tokenExpirationDate: Date }) {
  }

}
export class Logout implements Action {
  readonly type = LOGOUT;

}

export type AuthActions = Login | Logout;
