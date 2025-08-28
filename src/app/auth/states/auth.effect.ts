import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess } from './auth.action';
import { exhaustMap, map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthEffect {
  constructor(
    private authService: AuthService,
    private $actions: Actions,
    private router: Router
  ) {}

  $login = createEffect(() => {
    return this.$actions.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((res) => {
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
