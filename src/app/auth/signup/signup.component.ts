import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { singUpStart } from '../states/auth.action';
import { appState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  public signUpForm: FormGroup = new FormGroup({
    email: new FormControl('test@gmail.com', Validators.required),
    password: new FormControl('test1234', Validators.required),
  });

  constructor(private store: Store<appState>) {}
  onSubmit() {
    if (this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;
      // this.authService.login(email, password).subscribe((res) => {
      //   this.loggedUser = res;
      //   console.log('btn clicked', res);
      // });
      this.store.dispatch(singUpStart({ email, password }));
    } else {
      console.log('Form is invalid.');
      this.signUpForm.markAllAsTouched();
    }
  }

  handleEmailValidationError() {
    const emailControl = this.signUpForm.get('email');

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
    const passwordControl = this.signUpForm.get('password');
    if (passwordControl?.touched && !passwordControl?.valid) {
      if (passwordControl?.errors?.['required']) {
        return ' Password is required';
      }
    }
    return '';
  }
}
