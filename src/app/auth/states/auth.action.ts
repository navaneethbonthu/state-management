import { createAction, props } from '@ngrx/store';
import { AuthResponse } from 'src/app/models/auth-response';
import { User } from 'src/app/models/user';

export const loginStart = createAction(
  '[auth] login start',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[auth] login success',
  props<{ user: User; redirectTo: boolean }>()
);

export const singUpStart = createAction(
  '[auth] signup start',
  props<{ email: string; password: string }>()
);

export const signUpSuccess = createAction(
  '[auth] signup success',
  props<{ user: User; redirectTo: boolean }>()
);

export const autoLogin = createAction('[auth] auto login');
export const logout = createAction('[auth] logout');
