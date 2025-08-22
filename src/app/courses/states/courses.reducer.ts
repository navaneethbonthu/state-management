import { createReducer, on } from '@ngrx/store';
import { initialState } from './courses.state';
import { createCourse, showFormAction } from './courses.actions';

export const coursesReducer = createReducer(
  initialState,
  on(showFormAction, (state, action) => {
    return { ...state, showForm: action.value };
  }),
  on(createCourse, (state, action) => {
    const course = { ...action.course };
    course.id = state.courses.length + 1;
    return { ...state, courses: [...state.courses, course] };
  })
);
