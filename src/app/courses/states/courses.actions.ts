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

export const setEditMode = createAction(
  'setEditMode',
  props<{ value: boolean }>()
);
export const setSelectedCourse = createAction(
  'setSelectedCourse',
  props<{ course: Course | null }>()
);

export const updateCourse = createAction(
  'updateCourse',
  props<{ course: Course | null }>()
);

export const deleteCourse = createAction(
  'deleteCourse',
  props<{ id: string | undefined }>()
);
