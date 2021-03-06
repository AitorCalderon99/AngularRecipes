import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: number,
  localId: string,
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An uknown error ocurred.'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
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
    return throwError(errorMessage);
  }

  private handleAuth(email: string, localId: string, idToken: string, expiresIn: number) {

    let expirationDate = new Date(new Date().getTime() + +expiresIn * 1000)
    const user = new User(email, localId, idToken, expirationDate)
    this.user.next(user);
    this.autoLogout(expiresIn*1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.autoLogout(loadedUser.tokenExpirationDate.getTime() - new Date().getTime());
    }

  }

  login(email: string, password: string,) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBgZUcL-r-8EQ1QTuSCRplRCREvYzAorZY',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }));
  }

  signUp(email: string, password: string,) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBgZUcL-r-8EQ1QTuSCRplRCREvYzAorZY',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/user'])
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }
}
