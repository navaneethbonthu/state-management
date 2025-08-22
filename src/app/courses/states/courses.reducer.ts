import { createReducer, on } from '@ngrx/store';
import { initialState } from './courses.state';
import { showFormAction } from './courses.actions';

export const coursesReducer = createReducer(
  initialState,
  on(showFormAction, (state, action) => {
    return { ...state, showForm: action.value };
  })
);
