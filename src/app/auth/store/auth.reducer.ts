import {User} from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User;
}

const initialState: State = {user: null};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case "LOGIN":
      const user = new User(action.payload.email, action.payload.id, action.payload.token, action.payload.tokenExpirationDate);
      return {...state, user: user};
    case "LOGOUT":
      return {...state, user: null};
    default:
      return state;

  }
}
