import { createReducer, on } from '@ngrx/store';
import { initialState } from './courses.state';
import {
  createCourse,
  createCourseSuccess,
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
  on(createCourseSuccess, (state, action) => {
    return { ...state, courses: [...state.courses, action.course] };
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
