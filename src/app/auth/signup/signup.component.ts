import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('test@gmail.com', Validators.required),
    password: new FormControl('test1234', Validators.required),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // this.authService.login(email, password).subscribe((res) => {
      //   this.loggedUser = res;
      //   console.log('btn clicked', res);
      // });

      // this.store.dispatch(loginStart({ email, password }));
    } else {
      console.log('Form is invalid.');
      this.loginForm.markAllAsTouched();
    }
  }

  handleEmailValidationError() {
    const emailControl = this.loginForm.get('email');

    if (emailControl?.touched && !emailControl?.valid) {
      if (emailControl?.errors?.['required']) {
        return 'Email is required';
      }
      if (emailControl.errors?.['email']) {
        return 'Email is not valid';
      }
    }
    return '';
  }

  handlePasswordValidationError() {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.touched && !passwordControl?.valid) {
      if (passwordControl?.errors?.['required']) {
        return ' Password is required';
      }
    }
    return '';
  }
}
