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
