import { authReducer } from '../auth/states/auth.reducer';
import { AuthState } from '../auth/states/auth.state';
import { AUTH_STATE } from '../constants/constants';
import { sharedReducer } from '../shared/shared.reducer';
import { SharedState } from '../shared/shared.state';

export interface appState {
  [AUTH_STATE]: AuthState;
  shared: SharedState;
}

export const appReducer = {
  [AUTH_STATE]: authReducer,
  shared: sharedReducer,
};
