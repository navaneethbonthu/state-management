import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/store/app.state';
import { loginStart } from '../states/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('test@gmail.com', Validators.required),
    password: new FormControl('test1234', Validators.required),
  });

  loggedUser: User | null = null;

  constructor(
    private authService: AuthService,
    private store: Store<appState>
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // this.authService.login(email, password).subscribe((res) => {
      //   this.loggedUser = res;
      //   console.log('btn clicked', res);
      // });

      this.store.dispatch(loginStart({ email, password }));
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
