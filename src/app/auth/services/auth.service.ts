import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_KEY } from 'src/app/constants/constants';
import { User } from 'src/app/models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    const body = { email, password, returnSecureToken: true };
    return this.http.post<User>(url, body);
  }

  onSetErrorMessage(errorResponse: HttpErrorResponse) {
    let message = errorResponse.error.error.message;

    if (errorResponse.error || !errorResponse.error.error) {
      return message;
    }

    switch (errorResponse.error.error.message) {
      // case 'INVALID_LOGIN_CREDENTIALS':
      //   message = 'Invalid login credintials.';
      //   break;
      case 'EMAIL_NOT_FOUND':
        message = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        message = 'This password is not correct.';
        break;
      case 'USER_DISABLED':
        message = 'This user has been disabled.';
        break;
      default:
        message = errorResponse.error.error.message;
        break;
    }
    return message;
  }
}
