import {
  createFeature,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { SHARED_STATE } from '../constants/constants';
import { SharedState } from './shared.state';
import { state } from '@angular/animations';

export const shardFeatureSelector =
  createFeatureSelector<SharedState>(SHARED_STATE);

export const getIsLoading = createSelector(shardFeatureSelector, (state) => {
  return state.isLoading;
});

export const getErrorMessage = createSelector(shardFeatureSelector, (state) => {
  return state.errorMassage;
});
