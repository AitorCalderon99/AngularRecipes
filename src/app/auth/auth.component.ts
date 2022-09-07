import {Component, OnDestroy, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import { AuthService} from "./auth.service";
import { Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from "./store/auth.actions";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoggingMode = true;
  isLoading = false;
  error: string = null;
  private storeSub: Subscription;

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {
  }

  onSwitchMode() {
    this.isLoggingMode = !this.isLoggingMode
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;


    if (this.isLoggingMode) {
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
    } else {
      this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}));
    }

    authForm.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError())
  }

  ngOnDestroy(): void {
    if (this.storeSub)
      this.storeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;

    });
  }
}
