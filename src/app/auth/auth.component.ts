import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoggingMode = true;
  isLoading = false;

  constructor(private authService: AuthService) {
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

    if (this.isLoggingMode){

    }else{
      this.authService.signUp(email, password).subscribe(response => {
        console.log(response);
        this.isLoading = false;

      },error => {
        console.log(error);
        this.isLoading = false;

      });

      console.log(authForm);
    }
    authForm.reset();
  }
}
