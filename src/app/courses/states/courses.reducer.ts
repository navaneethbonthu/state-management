import { createReducer, on } from '@ngrx/store';
import { initialState } from './courses.state';
import { getCourses } from './courses.actions';

export const coursesReducer = createReducer(initialState);
