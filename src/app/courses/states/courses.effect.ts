import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { createCourse, createCourseSuccess } from './courses.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CourseService } from '../services/course.service';
import { Course } from 'src/app/models/course';
import { setErrorMessage, setIsLoading } from 'src/app/shared/shared.action';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/store/app.state';

@Injectable({
  providedIn: 'root',
})
export class CoursesEffect {
  constructor(
    private $actions: Actions,
    private courseService: CourseService,
    private store: Store<appState>
  ) {}

  $createCourse = createEffect(() => {
    return this.$actions.pipe(
      ofType(createCourse),
      mergeMap((action) => {
        this.store.dispatch(setIsLoading({ value: true }));
        return this.courseService.createCourse(action.course).pipe(
          map((res) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const course: Course = {
              ...action.course,
              id: res.name,
            };
            return createCourseSuccess({ course: course });
          }),
          catchError((error) => {
            this.store.dispatch(setIsLoading({ value: false }));
            return of(setErrorMessage({ message: 'Something went worng' }));
          })
        );
      })
    );
  });
}
