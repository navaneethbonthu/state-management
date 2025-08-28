import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess } from './auth.action';
import { exhaustMap, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/store/app.state';
import { setIsLoading } from 'src/app/shared/shared.action';

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
            return loginSuccess({ user: res });
          })
        );
      })
    );
  });

  $loginRedirect = createEffect(
    () => {
      return this.$actions.pipe(
        ofType(loginSuccess),
        tap((action) => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );
}
