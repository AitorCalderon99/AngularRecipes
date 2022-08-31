import {User} from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {user: null, authError: null, loading: false};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case "LOGIN":
      const user = new User(action.payload.email, action.payload.id, action.payload.token, action.payload.tokenExpirationDate);
      return {...state, user: user, loading: false};
    case "LOGIN_START":
      return {...state, authError: null, loading: true};
    case "LOGIN_FAIL":
      return {...state, authError: action.payload, user: null, loading: false};
    case "LOGOUT":
      return {...state, user: null};
    default:
      return state;

  }
}
