import { authReducer } from '../auth/states/auth.reducer';
import { AuthState } from '../auth/states/auth.state';
import { AUTH_STATE } from '../constants/constants';
import { counterState } from '../counter/states/counter.state';
import { CoursesState } from '../courses/states/courses.state';

export interface appState {
  [AUTH_STATE]: AuthState;
}

export const appReducer = { [AUTH_STATE]: authReducer };
