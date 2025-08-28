import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  autoLogin,
  loginStart,
  loginSuccess,
  signUpSuccess,
  singUpStart,
} from './auth.action';
import {
  catchError,
  EMPTY,
  exhaustMap,
  map,
  mergeMap,
  of,
  retry,
  tap,
} from 'rxjs';
import { Router } from '@angular/router';
import { createAction, Store } from '@ngrx/store';
import { appState } from 'src/app/store/app.state';
import { setErrorMessage, setIsLoading } from 'src/app/shared/shared.action';

@Injectable({
  providedIn: 'root',
})
export class AuthEffect {
  constructor(
    private authService: AuthService,
    private $actions: Actions,
    private router: Router,
    private store: Store<appState>
  ) {}

  $login = createEffect(() => {
    return this.$actions.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        this.store.dispatch(setIsLoading({ value: true }));
        return this.authService.login(action.email, action.password).pipe(
          map((res) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const loggedUser =
              this.authService.formateUserFormAuthResponse(res);
            this.authService.saveUserOnLocalStorage(loggedUser);
            return loginSuccess({ user: loggedUser });
          }),
          catchError((errorResponse) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const errMessage =
              this.authService.onSetErrorMessage(errorResponse);
            return of(setErrorMessage({ message: errMessage }));
          })
        );
      })
    );
  });

  $signUpStart = createEffect(() => {
    return this.$actions.pipe(
      ofType(singUpStart),
      exhaustMap((action) => {
        this.store.dispatch(setIsLoading({ value: true }));
        return this.authService.signup(action.email, action.password).pipe(
          map((res) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const signedUser =
              this.authService.formateUserFormAuthResponse(res);
            this.authService.saveUserOnLocalStorage(signedUser);
            return signUpSuccess({ user: signedUser });
          }),
          catchError((errorResponse) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const errMessage =
              this.authService.onSetErrorMessage(errorResponse);
            return of(setErrorMessage({ message: errMessage }));
          })
        );
      })
    );
  });
  $redirectToHome = createEffect(
    () => {
      return this.$actions.pipe(
        ofType(...[loginSuccess, signUpSuccess]),
        tap((action) => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  $autoLogin = createEffect(() => {
    return this.$actions.pipe(
      ofType(autoLogin),
      mergeMap((_) => {
        const user = this.authService.readUserOnLocalStorage();
        // console.log('readUserOnLocalStorage', user);

        if (user) {
          return of(loginSuccess({ user: user }));
        } else {
          return EMPTY;
        }
      })
    );
  });
}
