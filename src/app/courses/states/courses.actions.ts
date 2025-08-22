import { createAction, props } from '@ngrx/store';

export const showFormAction = createAction(
  'showFormAction',
  props<{ value: boolean }>()
);
