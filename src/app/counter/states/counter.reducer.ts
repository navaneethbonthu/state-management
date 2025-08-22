import { createReducer, on } from '@ngrx/store';
import {
  customIncrement,
  customToggle,
  decrement,
  increment,
  reset,
} from './counter.action';
import { intialState } from './counter.state';

export const counterReducer = createReducer(
  intialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state) => {
    return { ...state, counter: state.counter - 1 };
  }),

  on(reset, (state) => {
    return {
      ...state,
      counter: 0,
    };
  }),
  on(customIncrement, (state, action) => {
    return {
      ...state,
      counter: state.counter + action.value,
    };
  }),
  on(customToggle, (state) => {
    return {
      ...state,
      toggle: !state.toggle,
    };
  })
);
