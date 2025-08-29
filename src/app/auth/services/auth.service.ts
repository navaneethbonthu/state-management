import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { API_KEY } from 'src/app/constants/constants';
import { AuthResponse } from 'src/app/models/auth-response';
import { User } from 'src/app/models/user';
import { appState } from 'src/app/store/app.state';
import { logout } from '../states/auth.action';

@Injectable({ providedIn: 'root' })
export class AuthService {
  timer: any;
  constructor(private http: HttpClient, private store: Store<appState>) {}

  login(email: string, password: string): Observable<AuthResponse> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    const body = { email, password, returnSecureToken: true };
    return this.http.post<AuthResponse>(url, body);
  }
  signup(email: string, password: string): Observable<AuthResponse> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    const body = { email, password, returnSecureToken: true };
    return this.http.post<AuthResponse>(url, body);
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

  formateUserFormAuthResponse(res: AuthResponse) {
    const expairesAtTimeStamp = Date.now() + +res.expiresIn * 1000;
    const formatedUser: User = {
      idToken: res.idToken,
      email: res.email,
      expiresAt: expairesAtTimeStamp,
      localId: res.localId,
    };
    return formatedUser;
  }

  saveUserOnLocalStorage(user: User) {
    try {
      localStorage.setItem('user', JSON.stringify(user));
      this.autoLogoutUser(user);
    } catch {
      console.log('Some error occured while store the user in localStorage');
    }
  }

  readUserOnLocalStorage() {
    try {
      const localStorageuser = localStorage.getItem('user');

      if (!localStorageuser) {
        return null;
      }
      const user: User = JSON.parse(localStorageuser);
      if (user.expiresAt <= Date.now()) {
        console.log('User session has expired.');
        localStorage.removeItem('user');
        return null;
      }
      return user;
    } catch (error) {
      localStorage.removeItem('user');
      return null;
    }
  }

  logout() {
    localStorage.removeItem('user');
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  autoLogoutUser(user: User) {
    const interval = user.expiresAt - Date.now();
    this.timer = setTimeout(() => {
      this.store.dispatch(logout());
    }, interval);
  }
}
