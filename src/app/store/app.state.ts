import { counterReducer } from '../counter/states/counter.reducer';
import { counterState } from '../counter/states/counter.state';
import { coursesReducer } from '../courses/states/courses.reducer';
import { CoursesState } from '../courses/states/courses.state';

export interface appState {
  counter: counterState;
  courses: CoursesState;
}

export const appReducer = { counter: counterReducer, courses: coursesReducer };
