import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import { HttpClient } from '@angular/common/http';

import * as AuthActions from './auth.actions';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBgZUcL-r-8EQ1QTuSCRplRCREvYzAorZY',
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        })
        .pipe(
          map(resData => {
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            return new AuthActions.Login({
              email: resData.email,
              id: resData.localId,
              token: resData.idToken,
              tokenExpirationDate: expirationDate
            });
          }),
          catchError(errorRes => {
            let errorMessage = 'An uknown error ocurred.'
            if (!errorRes.error || !errorRes.error.error) {
              return of(new AuthActions.LoginFail(errorMessage));
            }
            switch (errorRes.error.error.message) {
              case 'EMAIL_EXISTS':
                errorMessage = 'Email exists';
                break;
              case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'Operation not allowed, please contact with the administrator';
                break;
              case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'Too many sign up attempts, try again later';
                break;
              case 'EMAIL_NOT_FOUND':
                errorMessage = 'Account not found';
                break;
              case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password';
                break;
            }
            return of(new AuthActions.LoginFail(errorMessage));
          })
        );
    })
  );
  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(ofType(AuthActions.LOGIN),
    tap(()=> {
      this.router.navigate(['/']);
    }));

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
