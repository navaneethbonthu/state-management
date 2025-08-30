import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/models/course';

export const showFormAction = createAction(
  'showFormAction',
  props<{ value: boolean }>()
);

export const createCourse = createAction(
  'createCourse',
  props<{ course: Course }>()
);

export const createCourseSuccess = createAction(
  '[courses] create course success',
  props<{ course: Course }>()
);

export const readCourses = createAction('[courses] read courses');
export const readCourseSuccess = createAction(
  '[courses] read course success',
  props<{ courses: Course[] }>()
);

export const setEditMode = createAction(
  'setEditMode',
  props<{ value: boolean }>()
);
export const setSelectedCourse = createAction(
  'setSelectedCourse',
  props<{ course: Course | null }>()
);
export const updateCourse = createAction(
  '[courses] update course',
  props<{ course: Course }>()
);
export const updateCourseSuccess = createAction(
  '[courses] update course success',
  props<{ course: Course }>()
);

export const deleteCourse = createAction(
  'deleteCourse',
  props<{ id: string }>()
);

export const deleteCourseSuccess = createAction(
  'deleteCourseSuccess',
  props<{ id: string }>()
);
