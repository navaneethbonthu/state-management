import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './courses.state';

export const getCoursesState = createFeatureSelector<CoursesState>('courses');

export const getCourses = createSelector(getCoursesState, (state) => {
  return state.courses;
});

export const getShowForm = createSelector(getCoursesState, (state) => {
  return state.showForm;
});

export const getEditMode = createSelector(getCoursesState, (state) => {
  return state.isEditMode;
});

export const getSelectedCourse = createSelector(getCoursesState, (state) => {
  return state.selectedCourse;
});

export const getCourseById = (courseId: string) => {
  return createSelector(getCoursesState, (state) => {
    return state.courses.find((course) => course.id === courseId);
  });
};
