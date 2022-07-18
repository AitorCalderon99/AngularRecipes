import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoggingMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSwitchMode() {
    this.isLoggingMode = !this.isLoggingMode
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    this.isLoading = true;
    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObservable: Observable<AuthResponseData>;

    if (this.isLoggingMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password)
    }

    authObservable.subscribe(response => {
      console.log(response);
      this.isLoading = false;
      this.router.navigate(['/recipes']);

    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    });

    authForm.reset();
  }
}
