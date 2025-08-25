import { createReducer, on } from '@ngrx/store';
import { initialState } from './courses.state';
import {
  createCourse,
  deleteCourse,
  setEditMode,
  setSelectedCourse,
  showFormAction,
  updateCourse,
} from './courses.actions';
import { state } from '@angular/animations';

export const coursesReducer = createReducer(
  initialState,
  on(showFormAction, (state, action) => {
    return { ...state, showForm: action.value };
  }),
  on(createCourse, (state, action) => {
    const course = { ...action.course };
    course.id = state.courses.length + 1;
    return { ...state, courses: [...state.courses, course] };
  }),
  on(setEditMode, (state, action) => {
    return { ...state, isEditMode: action.value };
  }),
  on(setSelectedCourse, (state, action) => {
    return { ...state, selectedCourse: action.course };
  }),
  on(updateCourse, (state, action) => {
    const updatedCourses = state.courses.map((course) => {
      if (action.course && course.id === action.course?.id) {
        return action.course;
      } else {
        return course;
      }
    });

    return { ...state, courses: updatedCourses };
  }),
  on(deleteCourse, (state, action) => {
    const updatedCourse = state.courses.filter(
      (course) => course.id !== action.id
    );

    return { ...state, courses: updatedCourse };
  })
);
