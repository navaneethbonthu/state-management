import {
  createFeature,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { SHARED_STATE } from '../constants/constants';
import { SharedState } from './shared.state';

export const shardFeatureSelector =
  createFeatureSelector<SharedState>(SHARED_STATE);

export const getIsLoading = createSelector(shardFeatureSelector, (state) => {
  return state.isLoading;
});
