import { createReducer, on } from '@ngrx/store';
import { initialState } from './courses.state';
import {
  createCourse,
  createCourseSuccess,
  deleteCourse,
  deleteCourseSuccess,
  readCourseSuccess,
  setEditMode,
  setSelectedCourse,
  showFormAction,
  updateCourse,
  updateCourseSuccess,
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
  on(readCourseSuccess, (state, action) => {
    return { ...state, courses: action.courses };
  }),
  on(setEditMode, (state, action) => {
    return { ...state, isEditMode: action.value };
  }),
  on(setSelectedCourse, (state, action) => {
    return { ...state, selectedCourse: action.course };
  }),
  on(updateCourseSuccess, (state, action) => {
    const updatedCourses = state.courses.map((course) => {
      if (action.course && course.id === action.course?.id) {
        return action.course;
      } else {
        return course;
      }
    });

    return { ...state, courses: updatedCourses };
  }),
  on(deleteCourseSuccess, (state, action) => {
    const updatedCourses = state.courses.filter(
      (course) => course.id !== action.id
    );

    return { ...state, courses: updatedCourses };
  })
);
