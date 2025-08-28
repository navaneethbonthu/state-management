import { createAction, props } from '@ngrx/store';

export const setIsLoading = createAction(
  '[shared] set is loading',
  props<{ value: boolean }>()
);
