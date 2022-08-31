import {Actions, ofType} from "@ngrx/effects";
import * as AuthActions from "./auth.actions";

export class AuthEffects {
  constructor(private actions$: Actions) {
  }
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START)
  );
}
